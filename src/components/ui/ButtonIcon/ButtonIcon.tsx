import React, { ButtonHTMLAttributes, ReactComponentElement, cloneElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const variants = cva(
  'p-2 border-transparent rounded-full transition-all block group-disabled/button-icon:cursor-not-allowed group-disabled/button-icon:opacity-40',
  {
    variants: {
      variant: {
        standard:
          'text-on-surface-var group-hover/button-icon:bg-on-surface-var/[0.08] group-focus/button-icon:bg-on-surface-var/[0.12] group-active/button-icon:bg-on-surface-var/[0.12] group-disabled/button-icon:bg-transparent group-disabled/button-icon:text-on-surface',
        filled:
          'text-primary bg-surf-cont-highest/70 group-hover/button-icon:bg-surf-cont-highest/90 group-focus/button-icon:bg-surf-cont-highest/95 group-active/button-icon:bg-surf-cont-highest/95 group-disabled/button-icon:bg-on-surface group-disabled/button-icon:text-on-surface',
      },
    },
    defaultVariants: {
      variant: 'standard',
    },
  },
);

type ButtonIconProps = {
  children: ReactComponentElement<React.FC<React.SVGProps<SVGSVGElement>>>;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants>;

const ButtonIcon = ({ children, className, variant, ...other }: ButtonIconProps) => (
  <button className="p-1 group/button-icon outline-none border-none bg-transparent" {...other}>
    <span className={variants({ variant })}>
      {cloneElement(children, {
        width: 24,
        height: 24,
      })}
    </span>
  </button>
);

export default ButtonIcon;