'use client';

import React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { SVGIcon } from '@/types';

const variants = cva(
  'p-2 border-transparent rounded-full transition-all block group-disabled/button-icon:cursor-not-allowed group-disabled/button-icon:opacity-40',
  {
    variants: {
      variant: {
        standard:
          'text-on-surface-var group-hover/button-icon:bg-on-surface-var/[0.08] group-focus/button-icon:bg-on-surface-var/[0.12] group-active/button-icon:bg-on-surface-var/[0.12] group-disabled/button-icon:bg-transparent group-disabled/button-icon:!text-on-surface',
        filled:
          'text-primary bg-surf-cont-highest/70 group-hover/button-icon:bg-surf-cont-highest/90 group-focus/button-icon:bg-surf-cont-highest/95 group-active/button-icon:bg-surf-cont-highest/95 group-disabled/button-icon:bg-on-surface group-disabled/button-icon:!text-on-surface',
      },
      layoutSize: {
        48: 'p-1',
        40: '',
      },
    },
    defaultVariants: {
      variant: 'standard',
      layoutSize: 48,
    },
  },
);

type ButtonIconProps = {
  children: SVGIcon;
} & VariantProps<typeof variants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonIcon = ({ children, className, variant, layoutSize, type = 'button', ...other }: ButtonIconProps) => (
  <button className={cn('group/button-icon outline-none border-none bg-transparent', className)} type={type} {...other}>
    <span className={variants({ variant, layoutSize })}>
      {React.cloneElement(children, {
        width: 24,
        height: 24,
      })}
    </span>
  </button>
);
ButtonIcon.displayName = 'ButtonIcon';

export default ButtonIcon;
