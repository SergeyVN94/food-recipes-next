'use client';

import React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { SVGIcon } from '@/types';

const buttonVariants = cva('group/button-icon outline-none border-none bg-transparent', {
  variants: {
    layoutSize: {
      48: 'p-1',
      40: '',
    },
  },
  defaultVariants: {
    layoutSize: 48,
  },
});

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
    },
    defaultVariants: {
      variant: 'standard',
    },
  },
);

type ButtonIconProps = {
  children: SVGIcon;
} & VariantProps<typeof variants> &
  VariantProps<typeof buttonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ children, className, variant, layoutSize, type = 'button', ...other }, ref) => (
    <button className={buttonVariants({ layoutSize, className })} type={type} ref={ref} {...other}>
      <span className={variants({ variant })}>
        {React.cloneElement(children, {
          width: 24,
          height: 24,
        })}
      </span>
    </button>
  ),
);
ButtonIcon.displayName = 'ButtonIcon';

export default ButtonIcon;
