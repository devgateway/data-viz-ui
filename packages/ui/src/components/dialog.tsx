'use client';

import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// SUI modal: bg white, no border, radius .28571429rem
// shadow: 1px 3px 3px 0 rgba(0,0,0,.2), 1px 3px 15px 2px rgba(0,0,0,.2)
// header padding 1.25rem 1.5rem, font-size 1.42857143rem, border-bottom rgba(34,36,38,.15)
// content padding 1.5rem
// backdrop: rgba(0,0,0,.85)

const dialogPopupVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'rounded-sui bg-white',
    'shadow-sui-modal',
    'focus:outline-none',
    'transition-[transform,opacity] duration-[300ms] ease-[ease]',
    'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
    'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
  ].join(' '),
  {
    variants: {
      size: {
        small:      'w-full max-w-sm',
        medium:     'w-full max-w-lg',
        large:      'w-full max-w-2xl',
        fullscreen: 'h-screen w-screen max-w-none rounded-none',
      },
    },
    defaultVariants: { size: 'medium' },
  },
);

export interface DialogProps extends VariantProps<typeof dialogPopupVariants> {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
}

export const DvzDialog = ({
  open,
  onOpen,
  onClose,
  trigger,
  children,
  size = 'medium',
}: DialogProps) => (
  <Dialog.Root
    open={open}
    onOpenChange={(o) => (o ? onOpen?.() : onClose?.())}
  >
    {trigger && <Dialog.Trigger render={<span />}>{trigger}</Dialog.Trigger>}
    <Dialog.Portal>
      {/* SUI backdrop: rgba(0,0,0,.85) */}
      <Dialog.Backdrop className="fixed inset-0 z-50 bg-[rgba(0,0,0,.85)] transition-opacity duration-[300ms] ease-[ease] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
      <Dialog.Popup className={cn('ui modal', dialogPopupVariants({ size }))}>
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>
);
DvzDialog.displayName = 'Dialog';

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'header',
        // SUI modal header: padding 1.25rem 1.5rem, border-bottom, font-size 1.42857143rem
        'flex items-start justify-between border-b border-sui-border px-6 py-5',
        className,
      )}
      {...props}
    >
      <Dialog.Title className="text-[1.42857143rem] font-bold leading-[1.2857em] text-[rgba(0,0,0,.85)]">
        {children}
      </Dialog.Title>
      <Dialog.Close
        render={<button />}
        className={cn(
          'ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-sui',
          'text-sui-subtext transition-[color,opacity] duration-[100ms] ease-[ease]',
          'hover:text-sui-text hover:opacity-80',
          'focus-visible:outline-2 focus-visible:outline-sui-blue',
        )}
      >
        <X className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </Dialog.Close>
    </div>
  ),
);
DialogHeader.displayName = 'DialogHeader';

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    // SUI modal content: padding 1.5rem
    <div ref={ref} className={cn('content', 'p-6 text-[1em] text-sui-text', className)} {...props}>
      {children}
    </div>
  ),
);
DialogContent.displayName = 'DialogContent';

export interface DialogActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogActions = React.forwardRef<HTMLDivElement, DialogActionsProps>(
  ({ className, children, ...props }, ref) => (
    // SUI modal actions: padding 1rem 1rem, border-top
    <div
      ref={ref}
      className={cn('actions', 'flex justify-end gap-3 border-t border-sui-border px-6 py-4 bg-[#f9fafb] rounded-b-sui', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
DialogActions.displayName = 'DialogActions';

export const DialogClose = Dialog.Close;
export { DvzDialog as Dialog };
