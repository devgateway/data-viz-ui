import * as React from 'react';
import {
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  Check,
  CheckCircle,
  CircleArrowLeft,
  CircleChevronRight,
  Download,
  Expand,
  Filter,
  Globe,
  HelpCircle,
  Info,
  Mail,
  Minus,
  Plus,
  RotateCcw,
  Search,
  StepBack,
  StepForward,
  X,
  XCircle,
  Loader2,
  Menu,
  List,
  Home,
  ExternalLink,
  MapPin,
  BarChart2,
  LineChart,
  PieChart,
  Table,
  Pencil,
  Trash2,
  Copy,
  Share2,
  Link,
  Lock,
  Unlock,
  User,
  Users,
  Settings,
  Bell,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  Upload,
  FileText,
  Printer,
  RefreshCw,
  Undo2,
  Redo2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  type LucideProps,
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { SuiIconName } from '../types/icon-names';
import type { SuiSize } from '../types/semantic-sizes';

type LucideComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

// Accepts both SUI-style names (with spaces) and Lucide-style names (with hyphens)
const iconMap: Record<string, LucideComponent> = {
  // ── SUI-style names ─────────────────────────────────────────────────────────
  'search': Search,
  'arrow alternate circle left outline': CircleArrowLeft,
  'close': X,
  'times': X,
  'world': Globe,
  'envelope': Mail,
  'question circle': HelpCircle,
  'angle down': ChevronDown,
  'chevron down': ChevronDown,
  'angle up': ChevronUp,
  'chevron up': ChevronUp,
  'angle left': ChevronLeft,
  'angle right': ChevronRight,
  'angle double left': ChevronsLeft,
  'angle double right': ChevronsRight,
  'plus': Plus,
  'minus': Minus,
  'expand': Expand,
  'expand arrows alternate': Expand,
  'download': Download,
  'filter': Filter,
  'info circle': Info,
  'check': Check,
  'warning': AlertCircle,
  'warning circle': AlertCircle,
  'times circle': XCircle,
  'times circle outline': XCircle,
  'arrow alternate circle left': CircleArrowLeft,
  'check circle': CheckCircle,
  'undo': Undo2,
  'undo alternate': RotateCcw,
  'redo': Redo2,
  'chevron circle right': CircleChevronRight,
  'step backward': StepBack,
  'step forward': StepForward,
  'sort': ArrowUpDown,
  'sort ascending': ArrowUp,
  'sort descending': ArrowDown,
  // ── Lucide-style names (hyphenated) ─────────────────────────────────────────
  'help-circle': HelpCircle,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevrons-left': ChevronsLeft,
  'chevrons-right': ChevronsRight,
  'chevron-right-circle': CircleChevronRight,
  'arrow-left-circle': CircleArrowLeft,
  'x-circle': XCircle,
  'x': X,
  'rotate-ccw': RotateCcw,
  'step-back': StepBack,
  'step-forward': StepForward,
  'spinner': Loader2,
  'bars': Menu,
  'list': List,
  'home': Home,
  'external link': ExternalLink,
  'external link alternate': ExternalLink,
  'map marker': MapPin,
  'map marker alternate': MapPin,
  'chart bar': BarChart2,
  'chart line': LineChart,
  'chart pie': PieChart,
  'table': Table,
  'edit': Pencil,
  'trash': Trash2,
  'copy': Copy,
  'share': Share2,
  'link': Link,
  'lock': Lock,
  'unlock': Unlock,
  'user': User,
  'users': Users,
  'cog': Settings,
  'settings': Settings,
  'bell': Bell,
  'calendar': Calendar,
  'clock': Clock,
  'eye': Eye,
  'eye slash': EyeOff,
  'upload': Upload,
  'file': FileText,
  'file pdf': FileText,
  'print': Printer,
  'refresh': RefreshCw,
  'sort': ArrowUpDown,
  'sort ascending': ArrowUp,
  'sort descending': ArrowDown,
};

const sizeMap: Record<SuiSize, number> = {
  mini: 10,
  tiny: 12,
  small: 14,
  medium: 16,
  large: 20,
  big: 24,
  huge: 28,
  massive: 36,
};

export interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
  name: string;
  size?: SuiSize;
  disabled?: boolean;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 'medium', className, disabled, ...props }, ref) => {
    const LucideIcon = iconMap[name];
    if (!LucideIcon) return null;
    return (
      <LucideIcon
        ref={ref}
        size={sizeMap[size]}
        aria-hidden="true"
        className={cn('inline-block shrink-0', className)}
        {...props}
      />
    );
  },
);
Icon.displayName = 'Icon';
