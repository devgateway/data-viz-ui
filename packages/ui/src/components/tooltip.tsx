'use client';

import * as React from 'react';
import { Tooltip } from '@base-ui/react/tooltip';
import { Popover } from '@base-ui/react/popover';
import { cn } from '../lib/utils';

// SUI tooltip: dark bg, white text, small rounded, shadow
// SUI popup: white bg, border rgba(34,36,38,.15), radius .28571429rem, shadow

export const TooltipProvider = Tooltip.Provider;

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delayDuration?: number;
}

export const DvzTooltip = ({
  content,
  children,
  position = 'top',
  className,
  delayDuration = 300,
}: TooltipProps) => (
  <Tooltip.Provider delay={delayDuration}>
    <Tooltip.Root>
      <Tooltip.Trigger render={<span className="inline-flex" />}>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side={position} sideOffset={8}>
          <Tooltip.Popup
            className={cn(
              'ui popup',
              // SUI popup: dark bg, white text, small padding, .28571429rem radius
              'z-50 max-w-xs rounded-sui bg-[#1b1c1d] px-[.833em] py-[.58333333em]',
              'text-[.85714286rem] font-bold text-white',
              'shadow-[0_2px_4px_rgba(34,36,38,.12)]',
              'origin-[var(--transform-origin)]',
              'transition-[transform,scale,opacity] duration-[100ms] ease-[ease]',
              'data-[starting-style]:opacity-0 data-[starting-style]:scale-90',
              'data-[ending-style]:opacity-0 data-[ending-style]:scale-90',
              className,
            )}
          >
            {content}
            <Tooltip.Arrow className="fill-[#1b1c1d]" />
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);
DvzTooltip.displayName = 'Tooltip';

export interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const DvzPopover = ({
  content,
  children,
  position = 'bottom',
  open,
  onOpenChange,
  className,
}: PopoverProps) => (
  <Popover.Root open={open} onOpenChange={onOpenChange}>
    <Popover.Trigger render={<span className="inline-flex" />}>
      {children}
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Positioner side={position} sideOffset={8}>
        <Popover.Popup
          className={cn(
            'ui popup',
            // SUI popup: white bg, border, radius, shadow
            'z-50 w-72 rounded-sui border border-sui-border bg-white',
            'p-[1em] px-[1.4285714em]',
            'text-[1em] text-sui-text',
            'shadow-segment',
            'origin-[var(--transform-origin)]',
            'transition-[transform,scale,opacity] duration-[200ms] ease-[ease]',
            'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
            'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
            className,
          )}
        >
          {content}
          <Popover.Arrow className="fill-sui-border" />
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  </Popover.Root>
);
DvzPopover.displayName = 'Popover';

export { DvzTooltip as Tooltip, DvzPopover as Popover };
