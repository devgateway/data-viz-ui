"use client"
import React from 'react'
import { Page, usePages } from '@devgateway/wp-react-lib/v2'

export interface FooterProps {
  slug?: string
  locale?: string
}

function Footer({ slug = 'footer', locale }: FooterProps) {
  const { data: pages } = usePages({ slug, locale })
  const page = pages?.find((p) => p.slug === slug)

  if (!page) return null

  return <Page pages={[page]} />
}

export default Footer
