import * as React from 'react';
import { cn } from '../lib/utils';
import type { SuiSize } from '../types/semantic-sizes';

// SUI loader: border .2em solid, track rgba(0,0,0,.1), active #767676
// Border-radius 500rem (fully round), animation .6s linear infinite
const sizeClasses: Record<SuiSize, string> = {
  mini:    'h-[1rem]         w-[1rem]         border-[.2em]',
  tiny:    'h-[1.28571429rem] w-[1.28571429rem] border-[.2em]',
  small:   'h-[1.71428571rem] w-[1.71428571rem] border-[.2em]',
  medium:  'h-[2.28571429rem] w-[2.28571429rem] border-[.2em]',
  large:   'h-[3.42857143rem] w-[3.42857143rem] border-[.3em]',
  big:     'h-[4.57142857rem] w-[4.57142857rem] border-[.3em]',
  huge:    'h-[6.85714286rem] w-[6.85714286rem] border-[.3em]',
  massive: 'h-[9.14285714rem] w-[9.14285714rem] border-[.3em]',
};

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SuiSize;
  inline?: boolean | string;
  active?: boolean;
  inverted?: boolean;
  content?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = 'medium', inline, active: _active, inverted: _inverted, content: _content, ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(
        'ui loader active',
        // SUI: track rgba(0,0,0,.1), active part #767676
        'animate-spin rounded-full border-[rgba(0,0,0,.1)] border-t-sui-grey',
        sizeClasses[size],
        inline ? 'inline-block' : 'block',
        className,
      )}
      {...props}
    />
  ),
);
Spinner.displayName = 'Spinner';

// ── Dimmer ────────────────────────────────────────────────────────────────────

export interface DimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  inverted?: boolean;
}

export const Dimmer = React.forwardRef<HTMLDivElement, DimmerProps>(
  ({ className, active, inverted, children, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden={!active}
      className={cn(
        'ui dimmer absolute inset-0 flex items-center justify-center',
        'transition-opacity duration-[300ms] ease-[ease]',
        // SUI dimmer: bg rgba(0,0,0,.85) / inverted rgba(255,255,255,.85)
        inverted ? 'bg-[rgba(255,255,255,.85)]' : 'bg-[rgba(0,0,0,.85)]',
        active
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
Dimmer.displayName = 'Dimmer';

// ── LoadingOverlay ────────────────────────────────────────────────────────────

export interface LoadingOverlayProps {
  active?: boolean;
  inverted?: boolean;
  size?: SuiSize;
  children?: React.ReactNode;
  className?: string;
}

export const LoadingOverlay = ({
  active,
  inverted,
  size = 'large',
  children,
  className,
}: LoadingOverlayProps) => (
  <div className={cn('relative', className)}>
    {children}
    <Dimmer active={active} inverted={inverted}>
      <Spinner size={size} className={inverted ? 'border-t-sui-grey' : 'border-t-white'} />
    </Dimmer>
  </div>
);
LoadingOverlay.displayName = 'LoadingOverlay';
