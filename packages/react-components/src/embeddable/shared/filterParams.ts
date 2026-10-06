export const FILTER_CHANGE_EVENT = 'filterchange'
export const CATEGORY_VALUE_PARAM = 'categoryValueId'

export function readCheckedFromUrl(): Set<number> {
  if (typeof window === 'undefined') return new Set()
  const raw = new URLSearchParams(window.location.search).get(CATEGORY_VALUE_PARAM)
  if (!raw) return new Set()
  return new Set(raw.split(',').map(Number).filter(Boolean))
}

export function writeCheckedToUrl(checked: Set<number>): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  if (checked.size > 0) {
    params.set(CATEGORY_VALUE_PARAM, [...checked].join(','))
  } else {
    params.delete(CATEGORY_VALUE_PARAM)
  }
  const qs = params.toString()
  window.history.pushState({}, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  window.dispatchEvent(new CustomEvent(FILTER_CHANGE_EVENT))
}

export function hasActiveFilters(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).has(CATEGORY_VALUE_PARAM)
}

export function clearAllFilters(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  params.delete(CATEGORY_VALUE_PARAM)
  const qs = params.toString()
  window.history.pushState({}, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  window.dispatchEvent(new CustomEvent(FILTER_CHANGE_EVENT))
}
