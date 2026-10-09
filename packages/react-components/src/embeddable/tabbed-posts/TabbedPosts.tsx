"use client"
import React, { useEffect, useId, useState } from 'react'
import { Content, PostIcon, PostLabel, useMedia, usePosts } from '@devgateway/wp-react-lib/v2'
import type { PostType } from '@devgateway/wp-react-lib/v2'

export interface TabbedPostsProps {
  type?: string
  taxonomy?: string
  categories?: string | string[]
  items?: number | string
  height?: number | string
  showLabels?: boolean | string
  showIcons?: boolean | string
  useScrolls?: boolean | string
  locale?: string
  'data-type'?: string
  'data-taxonomy'?: string
  'data-categories'?: string
  'data-items'?: string
  'data-height'?: string
  'data-show-labels'?: string
  'data-show-icons'?: string
  'data-use-scrolls'?: string
  'data-locale'?: string
  [key: string]: unknown
}

const isTrue = (value: unknown) => value === true || value === 'true'

// The saved block gives "5,7"; the editor preview iframe gives a JSON array string ("[5,7]").
function normalizeCategories(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value.join(',')
  if (typeof value === 'string' && value.startsWith('[')) {
    try {
      return (JSON.parse(value) as unknown[]).join(',')
    } catch {
      return value
    }
  }
  return value
}

const TabIcon = ({ post, locale }: { post: PostType; locale?: string }) => {
  const { data: media } = useMedia({ slug: post.meta_fields.icon[0], locale })
  return <PostIcon media={media} className="h-5 w-5 object-contain" />
}

const TabTitle = ({ post, showLabels, showIcons, locale }: { post: PostType; showLabels: boolean; showIcons: boolean; locale?: string }) => (
  <span className="inline-flex items-center gap-2">
    {showIcons && post.meta_fields?.icon?.[0] && <TabIcon post={post} locale={locale} />}
    {showLabels ? <PostLabel post={post} /> : <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />}
  </span>
)

function TabbedPosts(props: TabbedPostsProps) {
  const type = (props['data-type'] as string) ?? props.type
  const taxonomy = (props['data-taxonomy'] as string) ?? props.taxonomy
  const rawCategories = (props['data-categories'] as string) ?? props.categories
  const items = Number((props['data-items'] as string) ?? props.items) || undefined
  const height = (props['data-height'] as string) ?? props.height
  const showLabels = isTrue(props['data-show-labels'] ?? props.showLabels)
  const showIcons = isTrue(props['data-show-icons'] ?? props.showIcons)
  const useScrolls = isTrue(props['data-use-scrolls'] ?? props.useScrolls)
  const locale = (props['data-locale'] as string) ?? props.locale

  const categories = normalizeCategories(rawCategories)

  const { data: posts } = usePosts({
    type,
    // The block saves "none" when no taxonomy is chosen; sent as-is it would become a `?none=` query param.
    taxonomy: taxonomy === 'none' ? undefined : taxonomy,
    categories,
    perPage: items,
    locale,
  })

  const [selected, setSelected] = useState<string>()
  const baseId = useId()

  useEffect(() => {
    const slug = window.location.hash.slice(1)
    if (slug && posts?.some((p) => p.slug === slug)) setSelected(slug)
  }, [posts])

  if (!posts?.length) return null

  const active = selected ?? posts[0].slug

  return (
    <div className="viz tabbed posts">
      <div className="flex overflow-x-auto border-b border-border mb-8" role="tablist">
        {posts.map((post) => (
          <button
            key={post.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${post.slug}`}
            aria-selected={active === post.slug}
            aria-controls={`${baseId}-panel-${post.slug}`}
            onClick={() => setSelected(post.slug)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
              active === post.slug
                ? 'border-[#fdb714] text-primary font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <TabTitle post={post} showLabels={showLabels} showIcons={showIcons} locale={locale} />
          </button>
        ))}
      </div>

      <div className={useScrolls ? 'overflow-y-auto' : undefined} style={useScrolls && height ? { height: `${height}px` } : undefined}>
        {/* Every panel stays mounted: Content mounts embedded components into their own roots, which a tab switch must not tear down and refetch. */}
        {posts.map((post) => (
          <div
            key={post.id}
            role="tabpanel"
            id={`${baseId}-panel-${post.slug}`}
            aria-labelledby={`${baseId}-tab-${post.slug}`}
            hidden={active !== post.slug}
          >
            <Content post={post} locale={locale} showIntro showContent />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TabbedPosts
