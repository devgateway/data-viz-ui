"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { replaceLink, useMedia, useMenu, useSettings } from '@devgateway/wp-react-lib/v2'
import type { Menu, MenuItem } from '@devgateway/wp-react-lib/v2'
import { useWpSettings } from '../embeddable/shared/useWpSettings'

export interface HeaderProps {
  menuName?: string
  homeUrl?: string
  /** When set, menu links are `/{locale}/{path}`; otherwise `/{path}`. */
  locale?: string
}

function toPortalItems(items: MenuItem[], locale?: string): MenuItem[] {
  return items.map((item) => ({
    ...item,
    url: replaceLink(item.url, locale),
    child_items: item.child_items && toPortalItems(item.child_items, locale),
  }))
}

function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

const LOCALE_ROOT = /^\/[a-z]{2}(-[a-z]{2})?$/i

function isActive(item: MenuItem, pathname: string): boolean {
  if (!item.url.startsWith('/')) return false
  const target = normalizePath(item.url.split(/[?#]/)[0])
  const current = normalizePath(pathname)
  if (target === '/') return current === '/' || LOCALE_ROOT.test(current)
  if (LOCALE_ROOT.test(target)) return current === target
  return current === target || current.startsWith(`${target}/`)
}

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none"
    className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
    aria-hidden="true"
  >
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MenuLink = ({
  item, className, onClick, children,
}: { item: MenuItem; className: string; onClick: () => void; children?: React.ReactNode }) => (
  <a
    href={item.url}
    target={item.target || undefined}
    rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
    onClick={onClick}
    className={className}
  >
    {children ?? item.title}
  </a>
)

function SiteLogo({ mediaId, alt }: { mediaId: number; alt: string }) {
  const { data: media } = useMedia({ slug: String(mediaId) });
  console.log("media", media)
  if (!media?.source_url) return null
  return <img src={media.source_url} alt={alt} className="w-8 h-8 object-contain shrink-0" />
}

function Header({ menuName = 'main', homeUrl = '/', locale }: HeaderProps) {
  const { data: menu } = useMenu<Menu>({ name: menuName })
  const { settings } = useWpSettings()

  const [pathname, setPathname] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openId, setOpenId] = useState<number | null>(null)
  const [mobileOpenId, setMobileOpenId] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname)
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenId(null)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const items = useMemo(() => toPortalItems(menu?.items ?? [], locale), [menu, locale])
  const siteName = settings?.name
  const logoId = settings?.site_icon || settings?.site_logo || 0
  const siteDescription = settings?.description

  const closeMenus = () => {
    setOpenId(null)
    setMobileOpen(false)
  }

  console.log("settings", settings)

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          <a
            href={homeUrl}
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-primary rounded"
            aria-label={siteName ? `${siteName} — home` : 'Home'}
          >
            {logoId > 0 && <SiteLogo mediaId={logoId} alt={siteName ?? ''} />}
            {siteName && (
              <div className="hidden sm:block leading-tight text-left">
                <div className="text-sm font-semibold text-foreground">{siteName}</div>
                {siteDescription && <div className="text-xs text-muted-foreground">{siteDescription}</div>}
              </div>
            )}
          </a>

          <nav ref={navRef} className="hidden md:flex items-center gap-1 ml-auto mr-4" aria-label="Primary navigation">
            {items.map((item) => {
              const active = isActive(item, pathname)
              const children = item.child_items ?? []

              if (children.length === 0) {
                return (
                  <MenuLink
                    key={item.ID}
                    item={item}
                    onClick={closeMenus}
                    className={`px-4 py-2 text-sm rounded transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                      active ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  />
                )
              }

              const open = openId === item.ID
              return (
                <div key={item.ID} className="relative">
                  <button
                    onClick={() => setOpenId(open ? null : item.ID)}
                    aria-expanded={open}
                    aria-haspopup="true"
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                      open || active ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.title}
                    <Chevron open={open} />
                  </button>

                  {open && (
                    <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-border rounded-lg shadow-lg py-2 z-50">
                      <div className="px-3">
                        {children.map((child) => (
                          <MenuLink
                            key={child.ID}
                            item={child}
                            onClick={closeMenus}
                            className="flex items-start gap-3 px-2 py-2 rounded hover:bg-muted transition-colors group focus-visible:outline-2 focus-visible:outline-primary"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                              {child.title}
                            </span>
                          </MenuLink>
                        ))}
                      </div>
                      {item.url && item.url !== '#' && (
                        <>
                          <div className="my-2 border-t border-border" />
                          <div className="px-3">
                            <MenuLink
                              item={item}
                              onClick={closeMenus}
                              className="px-2 py-1.5 text-xs text-primary hover:text-primary-dark font-medium focus-visible:outline-2 focus-visible:outline-primary rounded block"
                            >
                              View all {item.title.toLowerCase()} →
                            </MenuLink>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <>
                    <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border py-2 pb-3">
            {items.map((item) => {
              const active = isActive(item, pathname)
              const children = item.child_items ?? []

              if (children.length === 0) {
                return (
                  <MenuLink
                    key={item.ID}
                    item={item}
                    onClick={closeMenus}
                    className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      active ? 'text-primary font-semibold' : 'text-foreground hover:bg-muted'
                    }`}
                  />
                )
              }

              const open = mobileOpenId === item.ID
              return (
                <div key={item.ID}>
                  <button
                    onClick={() => setMobileOpenId(open ? null : item.ID)}
                    aria-expanded={open}
                    className="flex items-center justify-between w-full text-left px-3 py-2 text-sm rounded transition-colors text-foreground hover:bg-muted"
                  >
                    {item.title}
                    <Chevron open={open} />
                  </button>
                  {open && (
                    <div className="ml-3 border-l-2 border-border pl-3 mt-1 mb-1 space-y-0.5">
                      {children.map((child) => (
                        <MenuLink
                          key={child.ID}
                          item={child}
                          onClick={closeMenus}
                          className="flex items-center gap-2 w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted transition-colors text-foreground font-medium"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
