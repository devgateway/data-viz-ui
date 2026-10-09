// @vitest-environment jsdom
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

const mocks = vi.hoisted(() => ({ usePosts: vi.fn(), useMedia: vi.fn() }))

vi.mock('@devgateway/wp-react-lib/v2', () => ({
  usePosts: mocks.usePosts,
  useMedia: mocks.useMedia,
  Content: ({ post, showIntro, showContent }: { post: { content: { rendered: string } }; showIntro?: boolean; showContent?: boolean }) =>
    showIntro && showContent ? <div>{post.content.rendered}</div> : null,
  PostLabel: ({ post }: { post: { meta_fields: { label: string[] } } }) => <span>{post.meta_fields.label}</span>,
  PostIcon: ({ media }: { media?: { guid: { rendered: string } } }) => (media ? <img data-testid="icon" src={media.guid.rendered} alt="" /> : null),
}))

import TabbedPosts from './TabbedPosts'

const posts = [
  { id: 1, slug: 'about', title: { rendered: 'About' }, content: { rendered: 'About body' }, meta_fields: { label: ['About label'], icon: ['7'] } },
  { id: 2, slug: 'data', title: { rendered: 'Data &#8217;s' }, content: { rendered: 'Data body' }, meta_fields: { label: ['Data label'] } },
]

afterEach(() => {
  vi.clearAllMocks()
  window.location.hash = ''
})

describe('TabbedPosts', () => {
  it('renders nothing while there are no posts', () => {
    mocks.usePosts.mockReturnValue({ data: null })
    const { container } = render(<TabbedPosts />)

    expect(container).toBeEmptyDOMElement()
  })

  it('shows the first post and switches panels on tab click, keeping both mounted', () => {
    mocks.usePosts.mockReturnValue({ data: posts })
    render(<TabbedPosts />)

    expect(screen.getByRole('tab', { name: 'About' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('About body')).toBeVisible()
    expect(screen.getByText('Data body')).not.toBeVisible()

    fireEvent.click(screen.getByRole('tab', { name: /Data/ }))

    expect(screen.getByRole('tab', { name: /Data/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Data body')).toBeVisible()
    expect(screen.getByText('About body')).not.toBeVisible()
  })

  it('links each tab to its panel', () => {
    mocks.usePosts.mockReturnValue({ data: posts })
    render(<TabbedPosts />)

    const tab = screen.getByRole('tab', { name: 'About' })
    expect(document.getElementById(tab.getAttribute('aria-controls')!)).toHaveAttribute('role', 'tabpanel')
  })

  it('renders tab titles as HTML so entities are decoded', () => {
    mocks.usePosts.mockReturnValue({ data: posts })
    render(<TabbedPosts />)

    expect(screen.getByRole('tab', { name: 'Data ’s' })).toBeInTheDocument()
  })

  it('selects the tab named by the url hash', () => {
    window.location.hash = '#data'
    mocks.usePosts.mockReturnValue({ data: posts })
    render(<TabbedPosts />)

    expect(screen.getByRole('tab', { name: /Data/ })).toHaveAttribute('aria-selected', 'true')
  })

  it('reads query options from data-* attributes, as passed by the embed gateway', () => {
    mocks.usePosts.mockReturnValue({ data: posts })
    render(<TabbedPosts {...{ 'data-type': 'pages', 'data-taxonomy': 'none', 'data-categories': '5,7', 'data-items': '4', 'data-locale': 'fr' }} />)

    expect(mocks.usePosts).toHaveBeenCalledWith({ type: 'pages', taxonomy: undefined, categories: '5,7', perPage: 4, locale: 'fr' })
  })

  it('accepts categories as a JSON array string, as sent by the editor preview', () => {
    mocks.usePosts.mockReturnValue({ data: posts })
    render(<TabbedPosts {...{ 'data-categories': '[5,7]' }} />)

    expect(mocks.usePosts).toHaveBeenCalledWith(expect.objectContaining({ categories: '5,7' }))
  })

  it('shows post labels instead of titles when data-show-labels is "true"', () => {
    mocks.usePosts.mockReturnValue({ data: posts })
    render(<TabbedPosts {...{ 'data-show-labels': 'true' }} />)

    expect(screen.getByRole('tab', { name: 'About label' })).toBeInTheDocument()
  })

  it('loads icons only for posts that have one when data-show-icons is "true"', () => {
    mocks.usePosts.mockReturnValue({ data: posts })
    mocks.useMedia.mockReturnValue({ data: { guid: { rendered: 'https://example.com/icon.png' } } })
    render(<TabbedPosts {...{ 'data-show-icons': 'true' }} />)

    expect(mocks.useMedia).toHaveBeenCalledTimes(1)
    expect(mocks.useMedia).toHaveBeenCalledWith({ slug: '7', locale: undefined })
    expect(screen.getAllByTestId('icon')).toHaveLength(1)
  })

  it('applies the height to the content area only when scrolling is on', () => {
    mocks.usePosts.mockReturnValue({ data: posts })
    const { rerender } = render(<TabbedPosts {...{ 'data-height': '500' }} />)
    expect(screen.getAllByRole('tabpanel', { hidden: true })[0].parentElement).not.toHaveStyle({ height: '500px' })

    rerender(<TabbedPosts {...{ 'data-height': '500', 'data-use-scrolls': 'true' }} />)
    expect(screen.getAllByRole('tabpanel', { hidden: true })[0].parentElement).toHaveStyle({ height: '500px' })
  })
})
