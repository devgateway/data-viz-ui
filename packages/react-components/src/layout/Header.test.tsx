// @vitest-environment jsdom
import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const mocks = vi.hoisted(() => ({
  useMenu: vi.fn(),
  useWpSettings: vi.fn(),
  useMedia: vi.fn(),
  useWPClient: vi.fn(),
}))

vi.mock('@devgateway/wp-react-lib/v2', () => ({
  useMenu: mocks.useMenu,
  useMedia: mocks.useMedia,
  useWPClient: mocks.useWPClient,
}))
vi.mock('../embeddable/shared/useWpSettings', () => ({ useWpSettings: mocks.useWpSettings }))

import Header, { toPortalHref } from './Header'

const item = (ID: number, title: string, url: string, extra: Record<string, unknown> = {}) => ({
  ID, title, url, target: '', ...extra,
})

const menu = {
  items: [
    item(122, 'Home', 'http://localhost/wp'),
    item(126, 'Research Themes', '/themes', { child_items: [item(133, 'Adolescent data', 'http://localhost/wp/adolescent-data/')] }),
    item(124, 'Search', 'http://localhost/wp/?page_id=15', { object: 'page', object_id: '15' }),
  ],
}

beforeEach(() => {
  mocks.useMenu.mockReturnValue({ data: menu })
  mocks.useWpSettings.mockReturnValue({ settings: { name: 'Development Gateway', description: 'Primary Research Portal', site_logo: 7 } })
  mocks.useMedia.mockReturnValue({ data: { source_url: 'http://localhost/wp/uploads/logo.png' } })
  mocks.useWPClient.mockReturnValue({ getPage: vi.fn().mockResolvedValue({ data: { slug: 'search' } }) })
  window.history.pushState({}, '', '/themes')
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('toPortalHref', () => {
  it.each([
    ['http://localhost/wp', '/'],
    ['http://localhost/wp/search/', '/search/'],
    ['/themes', '/themes'],
    ['http://localhost/wp/?page_id=15', 'http://localhost/wp/?page_id=15'],
    ['https://example.org/about', 'https://example.org/about'],
    ['', '#'],
  ])('maps %s to %s', (input, expected) => {
    expect(toPortalHref(input)).toBe(expected)
  })
})

describe('Header', () => {
  it.each(['/', '/en', '/fr-ca/'])('marks Home active on %s', (path) => {
    window.history.pushState({}, '', path)
    render(<Header />)
    const home = screen.getByRole('navigation').querySelector('a[href="/"]')!
    expect(home).toHaveClass('text-primary')
  })


  it('fetches the "main" menu by default and honours menuName', () => {
    render(<Header />)
    expect(mocks.useMenu).toHaveBeenCalledWith({ name: 'main' })

    render(<Header menuName="footer" />)
    expect(mocks.useMenu).toHaveBeenCalledWith({ name: 'footer' })
  })

  it('renders top-level items as links and parents with children as buttons', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Primary navigation' })

    expect(nav.querySelector('a[href="/"]')).toHaveTextContent('Home')
    expect(nav.querySelector('a[href="http://localhost/wp/?page_id=15"]')).toHaveTextContent('Search')
  })

  it('rewrites ?page_id= page links to /{slug} once it is looked up', async () => {
    render(<Header />)
    const link = await screen.findByRole('link', { name: 'Search' })
    await waitFor(() => expect(link).toHaveAttribute('href', '/search'))
    expect(mocks.useWPClient().getPage).toHaveBeenCalledWith('15')
    expect(screen.getByRole('button', { name: /Research Themes/ })).toHaveAttribute('aria-expanded', 'false')
  })

  it('uses the locale prop in page links', async () => {
    render(<Header locale="fr" />)
    await waitFor(() => expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute('href', '/fr/search'))
  })

  it('opens the dropdown with child items and closes it on Escape', () => {
    render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: /Research Themes/ }))

    expect(screen.getByRole('link', { name: 'Adolescent data' })).toHaveAttribute('href', '/adolescent-data/')
    expect(screen.getByRole('link', { name: /View all research themes/ })).toHaveAttribute('href', '/themes')

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('link', { name: 'Adolescent data' })).not.toBeInTheDocument()
  })

  it('closes the dropdown on an outside click', () => {
    render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: /Research Themes/ }))
    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole('link', { name: 'Adolescent data' })).not.toBeInTheDocument()
  })

  it('shows the WordPress logo and site name', () => {
    render(<Header />)
    expect(mocks.useMedia).toHaveBeenCalledWith({ slug: '7' })
    expect(screen.getByRole('img', { name: 'Development Gateway' })).toHaveAttribute('src', 'http://localhost/wp/uploads/logo.png')
    expect(screen.getByText('Primary Research Portal')).toBeInTheDocument()
  })

  it('does not request media when no logo is configured', () => {
    mocks.useWpSettings.mockReturnValue({ settings: { name: 'Development Gateway', description: '', site_logo: 0, site_icon: 0 } })
    render(<Header />)
    expect(mocks.useMedia).not.toHaveBeenCalled()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders without nav items while the menu is loading', () => {
    mocks.useMenu.mockReturnValue({ data: null })
    mocks.useWpSettings.mockReturnValue({ settings: null })
    render(<Header />)
    expect(screen.getByRole('navigation').children).toHaveLength(0)
  })

  it('toggles the mobile menu and its accordion', () => {
    render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
    const themeButtons = screen.getAllByRole('button', { name: /Research Themes/ })
    const mobileThemes = themeButtons[themeButtons.length - 1]
    fireEvent.click(mobileThemes)
    expect(screen.getByRole('link', { name: 'Adolescent data' })).toBeInTheDocument()
  })
})
