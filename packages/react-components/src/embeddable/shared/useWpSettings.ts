"use client"
import { useState, useEffect } from 'react'
import type { WpSettings } from './types'

let baseUrl = ''
let cache: WpSettings | null = null
let inflight: Promise<WpSettings> | null = null

/**
 * Call once at app startup with the WP REST API base URL
 * (e.g. import.meta.env.VITE_REACT_APP_WP_API).
 */
export function configureWpSettings(url: string): void {
  baseUrl = url.replace(/\/+$/, '')
}

function settingsUrl(): string {
  return `${baseUrl}/dg/v1/settings`
}

function fetchSettings(): Promise<WpSettings> {
  if (cache) return Promise.resolve(cache)
  if (inflight) return inflight
  inflight = fetch(settingsUrl())
    .then((r) => r.json())
    .then((data: WpSettings) => {
      cache = data
      inflight = null
      return data
    })
    .catch(() => {
      inflight = null
      return {} as WpSettings
    })
  return inflight
}

export function useWpSettings(): { settings: WpSettings | null; loading: boolean } {
  const [settings, setSettings] = useState<WpSettings | null>(cache)
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache !== null) {
      setSettings(cache)
      setLoading(false)
      return
    }

    let cancelled = false
    fetchSettings().then((data) => {
      if (!cancelled) {
        setSettings(data)
        setLoading(false)
      }
    })

    return () => { cancelled = true }
  }, [])

  return { settings, loading }
}
