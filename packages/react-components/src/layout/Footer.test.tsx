// @vitest-environment jsdom
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const mocks = vi.hoisted(() => ({ usePages: vi.fn() }))

vi.mock('@devgateway/wp-react-lib/v2', () => ({
  usePages: mocks.usePages,
  Page: ({ pages }: { pages: Array<{ content: { rendered: string } }> }) => (
    <div>{pages.map((p) => p.content.rendered)}</div>
  ),
}))

import Footer from './Footer'

afterEach(() => vi.clearAllMocks())

describe('Footer', () => {
  it('fetches the page with the "footer" slug and renders it', () => {
    mocks.usePages.mockReturnValue({ data: [{ slug: 'footer', content: { rendered: 'Footer content' } }] })
    render(<Footer />)

    expect(mocks.usePages).toHaveBeenCalledWith({ slug: 'footer', locale: undefined })
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('passes the locale and a custom slug through', () => {
    mocks.usePages.mockReturnValue({ data: null })
    render(<Footer slug="site-footer" locale="fr" />)

    expect(mocks.usePages).toHaveBeenCalledWith({ slug: 'site-footer', locale: 'fr' })
  })

  it('renders nothing while loading or when no page has the slug', () => {
    mocks.usePages.mockReturnValue({ data: [{ slug: 'other', content: { rendered: 'x' } }] })
    const { container } = render(<Footer />)

    expect(container).toBeEmptyDOMElement()
  })
})
