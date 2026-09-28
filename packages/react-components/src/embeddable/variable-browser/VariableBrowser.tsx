import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import {
  columnFilteringFeature,
  createColumnHelper,
  createExpandedRowModel,
  createFilteredRowModel,
  filterFn_equals,
  globalFilteringFeature,
  rowExpandingFeature,
  tableFeatures,
  useTable,
  type FilterFn,
  type TableFeatures,
} from '@tanstack/react-table'
import { useGetFileVariablesQuery } from '../shared/api'
import type { FileVariable } from '../shared/types'

export interface VariableBrowserProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

// Custom global filter — searches both name and label regardless of columnId
const nameOrLabelFilter: FilterFn<TableFeatures, FileVariable> = (row, _id, value: string) => {
  const q = (value ?? '').toLowerCase()
  return (
    row.original.name.toLowerCase().includes(q) ||
    (row.original.label ?? '').toLowerCase().includes(q)
  )
}
nameOrLabelFilter.autoRemove = (val: unknown) => !val

// Declare at module scope — required by v9 (both runtime value and type source)
const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowExpandingFeature,
  filteredRowModel: createFilteredRowModel(),
  expandedRowModel: createExpandedRowModel(),
  filterFns: {
    nameOrLabel: nameOrLabelFilter,
    equals: filterFn_equals,
  },
})

const columnHelper = createColumnHelper<typeof features, FileVariable>()

const TYPE_BADGE: Record<string, string> = {
  Numeric: 'bg-purple-50 text-purple-800 border-purple-200',
  Categorical: 'bg-blue-50 text-blue-800 border-blue-200',
  String: 'bg-orange-50 text-orange-800 border-orange-200',
  Date: 'bg-gray-50 text-gray-700 border-gray-200',
}

const TYPES = ['Numeric', 'Categorical', 'String', 'Date'] as const

const columns = columnHelper.columns([
  columnHelper.accessor('name', {
    header: 'Variable',
    cell: (info) => (
      <span className="font-mono text-primary font-medium block truncate max-w-36">
        {info.getValue()}
      </span>
    ),
    enableColumnFilter: false,
  }),
  columnHelper.accessor('label', {
    header: 'Label',
    cell: (info) => info.getValue() ?? <span className="text-muted-foreground">—</span>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('section', {
    header: 'Section',
    cell: (info) => info.getValue() ?? <span className="text-muted-foreground">—</span>,
    filterFn: 'equals',
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => {
      const type = info.getValue()
      return (
        <span className={`text-[10px] font-mono border rounded px-1.5 py-0.5 ${TYPE_BADGE[type] ?? TYPE_BADGE.Date}`}>
          {type}
        </span>
      )
    },
    filterFn: 'equals',
  }),
  columnHelper.accessor('validCases', {
    header: 'Valid cases',
    cell: (info) => <span className="font-mono">{info.getValue().toLocaleString()}</span>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('missingCases', {
    header: 'Missing',
    cell: (info) => {
      const v = info.getValue()
      return (
        <span className={`font-mono ${v > 0 ? 'text-restricted' : 'text-muted-foreground'}`}>
          {v.toLocaleString()}
        </span>
      )
    },
    enableColumnFilter: false,
  }),
  columnHelper.display({
    id: 'categories',
    header: 'Categories',
    cell: ({ row }) => {
      const cats = row.original.categories
      if (!cats?.length) return <span className="text-muted-foreground">—</span>
      return (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="text-[10px] font-medium text-primary hover:text-primary-dark rounded focus-visible:outline-2 focus-visible:outline-primary"
          aria-expanded={row.getIsExpanded()}
        >
          {row.getIsExpanded() ? '▲' : '▼'} {cats.length}
        </button>
      )
    },
  }),
])

const CELL_CLS: Record<string, string> = {
  name: 'sticky left-0 bg-white z-10 border-r border-border',
  validCases: 'text-right',
  missingCases: 'text-right',
  categories: 'text-center',
}

const HEADER_CLS: Record<string, string> = {
  name: 'sticky left-0 bg-muted z-10 w-40 border-r border-border',
  label: 'min-w-56',
  section: 'w-28',
  type: 'w-24',
  validCases: 'w-24 text-right',
  missingCases: 'w-20 text-right',
  categories: 'w-24 text-center',
}

const VariableBrowser = (props: VariableBrowserProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl
  const { data: variables = [], isLoading } = useGetFileVariablesQuery(apiUrl ?? skipToken)

  const sections = React.useMemo(
    () => [...new Set(variables.map((v) => v.section).filter(Boolean))],
    [variables],
  )

  const table = useTable(
    {
      features,
      columns,
      data: variables,
      globalFilterFn: 'nameOrLabel',
      getRowCanExpand: (row) => row.original.categories.length > 0,
    },
    (state) => state,
  )

  const sectionFilter = (table.getColumn('section')?.getFilterValue() as string) ?? ''
  const typeFilter = (table.getColumn('type')?.getFilterValue() as string) ?? ''
  const filteredCount = table.getFilteredRowModel().rows.length

  if (isLoading) {
    return <div className="py-10 text-center text-sm text-muted-foreground">Loading variables…</div>
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
            <line x1="9" y1="9" x2="12" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={(table.state.globalFilter ?? '') as string}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder="Search variable name or label"
            className="w-full pl-7 pr-3 py-2 text-xs border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-white font-mono"
          />
        </div>

        {sections.length > 0 && (
          <select
            value={sectionFilter}
            onChange={(e) => table.getColumn('section')?.setFilterValue(e.target.value || undefined)}
            className="text-xs border border-border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All sections</option>
            {sections.map((s) => <option key={s!} value={s!}>{s}</option>)}
          </select>
        )}

        <select
          value={typeFilter}
          onChange={(e) => table.getColumn('type')?.setFilterValue(e.target.value || undefined)}
          className="text-xs border border-border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All types</option>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <span className="text-xs text-muted-foreground font-mono">
          {filteredCount} of {variables.length} variables
        </span>
      </div>

      <div className="border border-border rounded overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ minWidth: '640px' }}>
            <thead>
              <tr className="bg-muted border-b border-border text-left">
                {table.getFlatHeaders().map((header) => (
                  <th key={header.id} className={`px-3 py-2 font-semibold text-foreground ${HEADER_CLS[header.id] ?? ''}`}>
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <tr className={`hover:bg-muted/50 transition-colors ${row.getIsExpanded() ? 'bg-muted/30' : ''}`}>
                    {row.getAllCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-3 py-2.5 text-foreground ${CELL_CLS[cell.column.id] ?? ''}`}
                        style={cell.column.id === 'name' ? { background: 'inherit' } : undefined}
                      >
                        <table.FlexRender cell={cell} />
                      </td>
                    ))}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr className="bg-muted/20">
                      <td className="sticky left-0 bg-muted/20 px-3 py-0 border-r border-border z-10" />
                      <td colSpan={columns.length - 1} className="px-3 py-2.5">
                        <div className="flex flex-wrap gap-2">
                          {row.original.categories.map((cat, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 text-[10px] bg-white border border-border rounded px-2 py-1">
                              <span className="text-foreground">{cat.value}</span>
                              <span className="font-mono text-muted-foreground">({cat.frequency.toLocaleString()})</span>
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {filteredCount === 0 && (
            <div className="text-center py-10 text-sm text-muted-foreground">
              No variables match your search
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VariableBrowser
