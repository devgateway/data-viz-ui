"use client"
import React from 'react'
import { Page, usePages } from '@devgateway/wp-react-lib/v2'
import type { PostType } from '@devgateway/wp-react-lib/v2'

export interface FooterProps {
  slug?: string
  locale?: string
  /** A footer page already loaded (e.g. in a route loader); skips the client-side fetch. */
  page?: PostType | null
}

function Footer({ slug = 'footer', locale, page: initialPage }: FooterProps) {
  const { data: pages } = usePages({ slug, locale, initialData: initialPage ? [initialPage] : undefined })
  const page = pages?.find((p) => p.slug === slug)

  if (!page) return null

  return <Page pages={[page]} locale={locale} />
}

export default Footer
