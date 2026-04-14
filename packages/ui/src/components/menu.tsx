'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { useIsomorphicLayoutEffect } from '../hooks/use-isomorphic-layout-effect';

// SUI menu: bg white, border rgba(34,36,38,.15), radius .28571429rem
// shadow 0 1px 2px 0 rgba(34,36,38,.15), min-height 2.85714286em
// item padding .92857143em 1.14285714em, transition .1s ease

export interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  vertical?: boolean;
  pointing?: boolean;
  secondary?: boolean;
  tabular?: boolean;
  fluid?: boolean;
  text?: boolean;
  size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive';
  fixed?: 'top' | 'bottom';
}

export const Menu = React.forwardRef<HTMLElement, MenuProps>(
  ({ className, vertical, pointing, secondary, tabular, fluid, text, size: _size, fixed, children, ...props }, ref) => {
    const [scrolled, setScrolled] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
      if (!fixed) return;
      const handler = () => setScrolled(window.scrollY > 0);
      window.addEventListener('scroll', handler, { passive: true });
      handler();
      return () => window.removeEventListener('scroll', handler);
    }, [fixed]);

    return (
      <nav
        ref={ref}
        className={cn(
          'ui menu flex min-h-[2.85714286em] text-sui-text',
          'transition-[box-shadow] duration-[100ms] ease-[ease]',
          vertical && 'vertical',
          secondary && 'secondary',
          pointing && 'pointing',
          tabular && 'tabular',
          fluid && 'fluid',
          text && 'text',
          vertical ? 'flex-col' : 'flex-row flex-wrap items-center',
          // text menu: no background/border/shadow
          text ? 'bg-transparent border-none shadow-none rounded-none' :
            (!secondary && !tabular && 'bg-white rounded-sui border border-sui-border shadow-segment'),
          // Pointing menu: bottom border accent
          pointing && !vertical && 'border-b-2 border-b-sui-blue',
          pointing && vertical  && 'border-r-2 border-r-sui-blue',
          // Secondary: no border, just spacing
          secondary && 'gap-[.3571428571em]',
          // Tabular: bottom-aligned tabs
          tabular && 'border-b border-sui-border shadow-none rounded-none',
          fluid && 'w-full',
          fixed === 'top'    && 'fixed left-0 right-0 top-0 z-40 rounded-none',
          fixed === 'bottom' && 'fixed bottom-0 left-0 right-0 z-40 rounded-none',
          fixed && scrolled  && 'shadow-segment-hover',
          className,
        )}
        {...props}
      >
        {children}
      </nav>
    );
  },
);
Menu.displayName = 'Menu';

export interface MenuItemProps extends React.HTMLAttributes<HTMLElement> {
  active?: boolean;
  as?: React.ElementType;
  href?: string;
  name?: string;
  position?: 'right' | 'left';
  disabled?: boolean;
  fitted?: boolean | 'horizontally' | 'vertically';
  header?: boolean;
  link?: boolean;
  icon?: boolean;
  color?: string;
}

export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>(
  ({ className, active, as, href, name, position, disabled, fitted, header, link, icon, color, children, ...props }, ref) => {
    const Tag = as ?? (href ? 'a' : 'div');
    return (
      <Tag
        ref={ref}
        href={href}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled}
        className={cn(
          // SUI item: padding .92857143em 1.14285714em
          'item flex cursor-pointer items-center px-[1.14285714em] py-[.92857143em]',
          'text-[1em] leading-[1em] text-sui-text',
          'transition-[background-color,color,box-shadow] duration-[100ms] ease-[ease]',
          'hover:bg-[rgba(0,0,0,.03)] hover:text-sui-text',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sui-blue',
          // Active item — SUI uses slightly darker bg + bold
          active && 'font-bold text-sui-text bg-[rgba(0,0,0,.05)] shadow-[inset_0_-2px_0_rgba(34,36,38,.15)]',
          disabled && 'pointer-events-none opacity-[.45]',
          // SUI modifier classes
          fitted === true && 'fitted',
          typeof fitted === 'string' && `${fitted} fitted`,
          header && 'header',
          link && 'link',
          icon && 'icon',
          color,
          position === 'right' && 'right ml-auto',
          position === 'left' && 'left',
          className,
        )}
        {...props}
      >
        {children ?? name}
      </Tag>
    );
  },
);
MenuItem.displayName = 'MenuItem';

export interface MenuSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'right' | 'left';
}

/** SUI `<Menu.Menu>` equivalent — a sub-group within a menu. Renders a div with class `menu`. */
export const MenuSection = React.forwardRef<HTMLDivElement, MenuSectionProps>(
  ({ className, position, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'menu flex flex-row flex-wrap items-center',
        position === 'right' && 'right ml-auto',
        position === 'left' && 'left',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
MenuSection.displayName = 'MenuSection';
