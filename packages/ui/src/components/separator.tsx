import * as React from 'react';
import { cn } from '../lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  horizontal?: boolean;
  section?: boolean;
  hidden?: boolean;
}

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, section, hidden, horizontal: _horizontal = true, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn(
        'border-0 border-t border-sui-border',
        section ? 'my-6' : 'my-3',
        hidden && 'invisible',
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = 'Separator';
