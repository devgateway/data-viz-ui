import * as React from 'react';
import { cn } from '../lib/utils';

export interface FlagProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
}

// Converts an ISO 3166-1 alpha-2 code (or locale like 'en-US') to a flag emoji.
function toEmoji(code: string): string {
  const cc = code.split('-').pop()?.toUpperCase().slice(0, 2) ?? '';
  if (cc.length !== 2) return '🏳';
  return Array.from(cc)
    .map((c) => String.fromCodePoint(0x1f1e0 - 65 + c.charCodeAt(0)))
    .join('');
}

export const Flag = React.forwardRef<HTMLSpanElement, FlagProps>(
  ({ name, src, className, ...props }, ref) => {
    if (src) {
      return (
        <img
          src={src}
          alt={name}
          className={cn('inline-block h-4 w-6 object-cover align-middle', className)}
        />
      );
    }
    return (
      <span
        ref={ref}
        role="img"
        aria-label={name}
        className={cn('inline-block align-middle text-base leading-none', className)}
        {...props}
      >
        {toEmoji(name)}
      </span>
    );
  },
);
Flag.displayName = 'Flag';
