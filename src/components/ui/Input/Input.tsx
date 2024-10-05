'use client';

import React from 'react';

import * as Popover from '@radix-ui/react-popover';
import { Controller, useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

import { IconCancel } from '@/assets/icons';

import { ButtonIcon } from '../ButtonIcon';
import { InputVariantProps, inputVariants, labelVariants, wrapVariants } from './Input.lib';
import { AutoCompleteItem } from './Input.types';

type InputProps = {
  label?: string;
  subText?: string;
  className?: string;
  isFocus?: boolean;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  autoCompleteItems?: AutoCompleteItem[];
  onAutoCompleteSelect?: (id: string) => void;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  onClear?: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Omit<InputVariantProps, 'focus'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      label,
      subText,
      onChange,
      onClear,
      className = '',
      isFocus,
      iconRight,
      iconLeft,
      autoCompleteItems,
      onFocus,
      onBlur,
      onAutoCompleteSelect,
      ...other
    },
    ref,
  ) => {
    const [autoCompleteOpen, setAutoCompleteOpen] = React.useState(false);
    const localRef = React.useRef<HTMLInputElement>(null);
    const labelRef = React.useRef<HTMLSpanElement>(null);
    const buttonClearRef = React.useRef<HTMLButtonElement>(null);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
      const nextValue = ev.target.value;

      if (onChange) {
        onChange(ev, nextValue);
      }
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = ev => {
      onFocus?.(ev);

      if (autoCompleteItems) {
        setAutoCompleteOpen(true);
      }
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = ev => {
      onBlur?.(ev);

      if (autoCompleteItems) {
        setAutoCompleteOpen(true);
      }
    };

    const handleRootClick = () => {
      localRef.current?.focus();
    };

    const handleClear = () => {
      if (localRef.current) {
        labelRef.current?.setAttribute('data-focus', 'false');
        localRef.current.style.height = '';
      }

      if (buttonClearRef.current) {
        buttonClearRef.current.classList.add('hidden');
      }

      if (onClear) {
        onClear();
      }
    };

    React.useEffect(() => {
      const handleChange = () => {
        if (localRef.current) {
          labelRef.current?.setAttribute('data-focus', Boolean(localRef.current.value).toString());
        }

        if (buttonClearRef.current && localRef.current) {
          if (localRef.current.value) {
            buttonClearRef.current.classList.remove('hidden');
          } else {
            buttonClearRef.current.classList.add('hidden');
          }
        }
      };

      const inputEl = localRef.current;
      inputEl?.addEventListener('input', handleChange);

      return () => {
        inputEl?.removeEventListener('input', handleChange);
      };
    }, []);

    React.useEffect(() => {
      if (buttonClearRef.current && other.value) {
        buttonClearRef.current?.classList.remove('hidden');
      }
    }, [other.value]);

    return (
      <Popover.Root open={autoCompleteOpen}>
        <div className={className}>
          <div className={wrapVariants({ variant })} onClick={handleRootClick} data-icon-left={!!iconLeft}>
            {iconLeft &&
              React.cloneElement(iconLeft, {
                width: 48,
                height: 48,
                className: 'p-3',
              })}
            <label className="flex-1">
              <input
                className={inputVariants({ variant })}
                {...other}
                onBlur={handleBlur}
                onFocus={handleFocus}
                data-with-label={!!label}
                onChange={other.readOnly ? undefined : handleChange}
                ref={mergeRefs([ref, localRef])}
              />
              {label && (
                <span
                  className={labelVariants({ variant })}
                  ref={labelRef}
                  data-icon-left={!!iconLeft}
                  data-force-focus={!!(other.value ?? '') || other.placeholder || isFocus}
                >
                  {label}
                </span>
              )}
            </label>
            {onClear && (
              <ButtonIcon className="hidden" onClick={handleClear} type="button" ref={buttonClearRef} layoutSize={48}>
                <IconCancel />
              </ButtonIcon>
            )}
            {iconRight &&
              React.cloneElement(iconRight, {
                width: 48,
                height: 48,
                className: 'p-3',
              })}
          </div>
          {subText && <p className="pt-1 px-4 body-s text-on-surface-var">{subText}</p>}
        </div>
        <Popover.Portal>
          <Popover.Content>
            {autoCompleteItems?.map(item => (
              <div className="px-2 py-3 cursor-pointer" onClick={() => onAutoCompleteSelect?.(item.id)} key={item.id}>
                <p className="label-l">{label}</p>
              </div>
            ))}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);
Input.displayName = 'Input';

type InputControlledProps = Omit<InputProps, 'onChange' | 'value' | 'onBlur' | 'onFocus' | 'name'> & {
  name: string;
  isClearable?: boolean;
};

export const InputControlled = ({ isClearable = true, ...other }: InputControlledProps) => {
  const methods = useFormContext();

  const handleClear = () => {
    methods.resetField(other.name);

    if (other.onClear) {
      other.onClear();
    }
  };

  return (
    <Controller
      name={other.name}
      control={methods.control}
      render={({ field }) => (
        <Input {...other} onChange={(ev, value) => field.onChange(value)} onBlur={field.onBlur} value={field.value} onClear={handleClear} />
      )}
    />
  );
};

export default Input;
