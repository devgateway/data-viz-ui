'use client';

import * as React from 'react';
import { Popover } from '@base-ui/react/popover';
import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Spinner } from './spinner';

export interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface SearchInputProps {
  value?: string;
  onSearchChange?: (value: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  results?: SearchResult[];
  resultRenderer?: (result: SearchResult) => React.ReactNode;
  renderResults?: () => React.ReactNode;
  loading?: boolean;
  showNoResults?: boolean;
  placeholder?: string;
  total?: number;
  perPage?: number;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLInputElement>;
}

export const SearchInput = ({
  value: controlledValue,
  onSearchChange,
  onResultSelect,
  results = [],
  resultRenderer,
  renderResults,
  loading = false,
  showNoResults = true,
  placeholder = 'Search...',
  total,
  perPage,
  className,
  onBlur,
  onFocus,
  onMouseDown,
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = React.useState('');
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const isControlled = controlledValue !== undefined;
  const query = isControlled ? controlledValue : internalValue;

  // Popover open when there's a query — derived, no effect needed.
  const open = query.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!isControlled) setInternalValue(next);
    onSearchChange?.(next);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onSearchChange?.('');
  };

  const handleSelect = (result: SearchResult) => {
    onResultSelect?.(result);
    if (!isControlled) setInternalValue('');
  };

  return (
    <Popover.Root open={open} onOpenChange={(o) => { if (!o) handleClear(); }}>
      <div ref={anchorRef} className={cn('ui search', 'relative flex items-center', className)}>
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-sui-subtext" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onMouseDown={onMouseDown}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            'prompt',
            'h-full w-full rounded-sui border border-sui-border bg-white',
            'py-[.67857143em] pl-[2.67142857em] pr-[2.67142857em]',
            'text-[1em] text-sui-text placeholder:text-sui-placeholder',
            'outline-none',
            'transition-[border-color] duration-[100ms] ease-[ease]',
            'hover:border-sui-border-hover hover:bg-[#fafafa]',
            'focus:border-sui-focus-border focus:bg-white',
          )}
        />
        {(loading || query) && (
          <span className="absolute right-3">
            {loading ? (
              <Spinner size="tiny" inline />
            ) : (
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleClear}
                className="text-sui-subtext hover:text-sui-text focus-visible:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </span>
        )}
      </div>

      <Popover.Portal>
        <Popover.Positioner anchor={anchorRef} sideOffset={4} className="outline-none">
          <Popover.Popup className={cn(
            'z-50 w-[var(--anchor-width)] overflow-hidden rounded-sui border border-sui-border bg-white',
            'shadow-sui-dropdown',
            'transition-[transform,opacity] duration-[100ms] ease-[ease]',
            'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
          )}>
            {total !== undefined && (
              <div className="border-b border-sui-border px-3 py-2 text-xs text-sui-subtext">
                {results.length} of {total} results
                {perPage && ` (${perPage} per page)`}
              </div>
            )}

            <div className="max-h-72 overflow-y-auto p-1">
              {renderResults ? renderResults() : loading ? (
                <div className="flex justify-center py-6">
                  <Spinner size="medium" />
                </div>
              ) : results.length === 0 && showNoResults ? (
                <p className="py-6 text-center text-sm text-sui-subtext">No results for "{query}"</p>
              ) : (
                results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    className={cn(
                      'flex w-full cursor-pointer flex-col items-start',
                      'px-[1.14285714em] py-[.78571429em]',
                      'text-left text-[1em] text-sui-text',
                      'transition-[background-color,color] duration-[100ms] ease-[ease]',
                      'hover:bg-[rgba(0,0,0,.05)] hover:text-[rgba(0,0,0,.95)]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sui-blue',
                    )}
                    onClick={() => handleSelect(result)}
                  >
                    {resultRenderer ? (
                      resultRenderer(result)
                    ) : (
                      <>
                        <span className="font-medium text-sui-text">{result.title}</span>
                        {result.description && (
                          <span className="text-xs text-sui-subtext">{result.description}</span>
                        )}
                      </>
                    )}
                  </button>
                ))
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
SearchInput.displayName = 'SearchInput';
