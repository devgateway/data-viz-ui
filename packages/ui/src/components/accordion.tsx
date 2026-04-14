'use client';

import * as React from 'react';
import { Accordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

// SUI accordion: title padding .5em 0, content padding .5em 0 1em
// title font: bold, color rgba(0,0,0,.87)
// divider between items: 1px solid rgba(34,36,38,.15)
// icon transition: transform .1s ease

export interface AccordionItemData {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items?: AccordionItemData[];
  openMultiple?: boolean;
  defaultOpenItems?: string | string[];
  openItems?: string | string[];
  onOpenItemsChange?: (value: string | string[]) => void;
  fluid?: boolean;
  styled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const DvzAccordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, fluid, styled, children, items, openMultiple = false, ...props }, ref) => (
    <Accordion.Root
      ref={ref}
      multiple={openMultiple}
      className={cn(
        'ui accordion',
        fluid && 'fluid',
        styled && 'styled',
        'w-full',
        // only add our custom border/divide when NOT using `styled` (SUI handles styled)
        !styled && 'divide-y divide-sui-border rounded-sui border border-sui-border',
        className,
      )}
      {...(props as object)}
    >
      {items
        ? items.map((item) => (
            <Accordion.Item key={item.value} value={item.value} disabled={item.disabled}>
              <Accordion.Header className="flex">
                <Accordion.Trigger
                  className={cn(
                    'title',
                    'group flex flex-1 items-center justify-between',
                    'py-[.5em] px-[1em]',
                    'text-[1em] font-bold text-sui-text',
                    'cursor-pointer',
                    'transition-[background-color,color] duration-[100ms] ease-[ease]',
                    'hover:bg-[rgba(0,0,0,.03)] hover:text-sui-text',
                    'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sui-blue',
                    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[.45]',
                  )}
                >
                  {item.title}
                  <ChevronDown
                    className="h-[1em] w-[1em] shrink-0 text-sui-subtext transition-transform duration-[100ms] ease-[ease] group-data-[panel-open]:rotate-180"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="content overflow-hidden text-[1em] text-sui-text transition-[height] duration-200 data-[ending-style]:h-0 data-[starting-style]:h-0 h-[var(--accordion-panel-height)]">
                {/* SUI content padding: .5em 0 1em, with horizontal padding to match title */}
                <div className="px-[1em] pt-[.5em] pb-[1em]">{item.content}</div>
              </Accordion.Panel>
            </Accordion.Item>
          ))
        : children}
    </Accordion.Root>
  ),
);
DvzAccordion.displayName = 'Accordion';

export const AccordionItem = React.forwardRef<HTMLDivElement, Accordion.Item.Props>(
  ({ className, ...props }, ref) => (
    <Accordion.Item ref={ref} className={cn('', className)} {...props} />
  ),
);
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      ref={ref}
      className={cn(
        'title',
        'group flex flex-1 items-center justify-between',
        'py-[.5em] px-[1em]',
        'text-[1em] font-bold text-sui-text cursor-pointer',
        'transition-[background-color,color] duration-[100ms] ease-[ease]',
        'hover:bg-[rgba(0,0,0,.03)]',
        'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sui-blue',
        className,
      )}
      {...(props as object)}
    >
      {children}
      <ChevronDown
        className="h-[1em] w-[1em] shrink-0 text-sui-subtext transition-transform duration-[100ms] ease-[ease] group-data-[panel-open]:rotate-180"
        aria-hidden="true"
      />
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Accordion.Panel
    ref={ref}
    className={cn(
      'content',
      'overflow-hidden text-[1em] text-sui-text transition-[height] duration-200',
      'h-[var(--accordion-panel-height)] data-[ending-style]:h-0 data-[starting-style]:h-0',
      className,
    )}
    {...(props as object)}
  >
    <div className="px-[1em] pt-[.5em] pb-[1em]">{children}</div>
  </Accordion.Panel>
));
AccordionContent.displayName = 'AccordionContent';

export { DvzAccordion as Accordion };
