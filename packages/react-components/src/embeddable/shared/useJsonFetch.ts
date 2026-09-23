import { useEffect, useState } from 'react'

export function useJsonFetch<T>(url: string | undefined, fallback: T): T {
  const [data, setData] = useState<T>(fallback)

  useEffect(() => {
    if (!url) {
      return
    }

    let cancelled = false

    fetch(url)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`Request failed: ${response.status}`))))
      .then((json: T) => {
        if (!cancelled) {
          setData(json)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(fallback)
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return data
}
