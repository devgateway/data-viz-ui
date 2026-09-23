export function joinApiUrl(base: string, path?: string): string {
  const trimmedBase = base.replace(/\/+$/, '')

  if (!path) {
    return trimmedBase
  }

  const trimmedPath = path.startsWith('/') ? path : `/${path}`
  return `${trimmedBase}${trimmedPath}`
}
