export const FILTER_CHANGE_EVENT = 'filterchange'
const CAT_PARAM_PREFIX = 'cat_'

export function getFilterParam(categoryId: number): string {
  return `${CAT_PARAM_PREFIX}${categoryId}`
}

export function readCheckedFromUrl(categoryId: number): Set<number> {
  const raw = new URLSearchParams(window.location.search).get(getFilterParam(categoryId))
  if (!raw) return new Set()
  return new Set(raw.split(',').map(Number).filter(Boolean))
}

export function writeCheckedToUrl(categoryId: number, checked: Set<number>): void {
  const params = new URLSearchParams(window.location.search)
  const key = getFilterParam(categoryId)
  if (checked.size > 0) {
    params.set(key, [...checked].join(','))
  } else {
    params.delete(key)
  }
  const qs = params.toString()
  window.history.pushState({}, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  window.dispatchEvent(new CustomEvent(FILTER_CHANGE_EVENT))
}

export function hasActiveFilters(): boolean {
  const params = new URLSearchParams(window.location.search)
  for (const key of params.keys()) {
    if (key.startsWith(CAT_PARAM_PREFIX)) return true
  }
  return false
}

export function clearAllFilters(): void {
  const params = new URLSearchParams(window.location.search)
  for (const key of [...params.keys()]) {
    if (key.startsWith(CAT_PARAM_PREFIX)) params.delete(key)
  }
  const qs = params.toString()
  window.history.pushState({}, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  window.dispatchEvent(new CustomEvent(FILTER_CHANGE_EVENT))
}
