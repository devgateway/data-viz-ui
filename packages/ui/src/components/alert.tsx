import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
} from 'lucide-react';

// SUI message: radius .28571429rem, padding 1em 1.5em, line-height 1.4285em
// Each variant uses inset box-shadow instead of border — matches SUI exactly
const alertVariants = cva(
  'relative rounded-sui p-[1em] px-[1.5em] text-[1em] leading-[1.4285em]',
  {
    variants: {
      variant: {
        // .ui.positive.message — bg #fcfff5, text #2c662d
        positive: 'bg-[#fcfff5] text-[#2c662d] shadow-sui-msg-positive',
        // .ui.negative.message — bg #fff6f6, text #9f3a38
        negative: 'bg-[#fff6f6] text-[#9f3a38] shadow-sui-msg-negative',
        // .ui.warning.message — bg #fffaf3, text #573a08
        warning:  'bg-[#fffaf3] text-[#573a08] shadow-sui-msg-warning',
        // .ui.info.message — bg #f8ffff, text #276f86
        info:     'bg-[#f8ffff] text-[#276f86] shadow-sui-msg-info',
        // .ui.message (default)
        default:  'bg-[#f8f8f9] text-sui-text shadow-sui-message',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

// Header colors per variant — match SUI's .ui.message .header
const headerColorMap: Record<string, string> = {
  positive: 'text-[#1a531b]',
  negative: 'text-[#912d2b]',
  warning:  'text-[#794b02]',
  info:     'text-[#0e566c]',
  default:  'text-sui-text',
};

const variantIcons = {
  positive: CheckCircle,
  negative: XCircle,
  warning:  AlertCircle,
  info:     Info,
  default:  Info,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  variant?: 'positive' | 'negative' | 'warning' | 'info' | 'default';
  icon?: boolean;
  header?: React.ReactNode;
  color?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', icon, header, color, children, ...props }, ref) => {
    const IconComponent = variantIcons[variant];
    const headerColor = headerColorMap[variant];
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'ui message',
          variant !== 'default' && variant,
          color && color,
          alertVariants({ variant }),
          className,
        )}
        {...props}
      >
        <div className="flex gap-3">
          {icon && <IconComponent className="mt-[.15em] h-[1.14285714em] w-[1.14285714em] shrink-0" aria-hidden="true" />}
          <div>
            {header && (
              <p className={cn('mb-[.3em] font-bold', headerColor)}>{header}</p>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Alert.displayName = 'Alert';
