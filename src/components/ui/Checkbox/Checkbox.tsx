import { IconCheckBox, IconCheckBoxOutlineBlank, IconIndeterminateCheckboxFilled } from '@/assets/icons';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type' | 'onChange' | 'name' | 'placeholder' | 'value' | 'isIndeterminate'> & {
  name: string;
  label?: string;
} & (
    | {
        isIndeterminate: true;
        value: boolean | null;
        onChange: (ev: React.ChangeEvent<HTMLInputElement>, isChecked: boolean | null) => void;
      }
    | {
        isIndeterminate?: false;
        onChange: (ev: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
        value: boolean;
      }
  );

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ label, value, isIndeterminate = false, onChange, ...other }, ref) => {
  const localRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!isIndeterminate) {
      onChange(ev, !value);
      return;
    }

    if (value) {
      if (localRef.current) {
        localRef.current.indeterminate = false;
      }
      onChange(ev, false);
    } else if (value === null) {
      if (localRef.current) {
        localRef.current.indeterminate = false;
      }
      onChange(ev, true);
    } else {
      if (localRef.current) {
        localRef.current.indeterminate = true;
      }
      onChange(ev, null!);
    }
  };

  return (
    <label className="flex flex-nowrap items-center cursor-pointer">
      <input
        {...other}
        type="checkbox"
        onChange={handleChange}
        ref={mergeRefs([localRef, ref])}
        className="invisible absolute w-[1px] h-[1px] -top-2 outline-none opacity-0 peer"
      />
      <span className="p-2 rounded-full text-primary transition-all hover:bg-primary/[0.08] peer-focus:bg-primary/[0.08] peer-disabled:cursor-not-allowed peer-disabled:text-on-surface peer-disabled:opacity-[0.12] peer-disabled:hover:bg-transparent">
        {value === true && <IconCheckBox className="w-6 h-6" />}
        {value === false && <IconCheckBoxOutlineBlank className="w-6 h-6" />}
        {value === null && <IconIndeterminateCheckboxFilled className="w-6 h-6" />}
      </span>
      <span className="body-l select-none">{label}</span>
    </label>
  );
});
Checkbox.displayName = 'Checkbox';

type CheckboxControlledProps = Omit<CheckboxProps, 'onChange' | 'checked' | 'value'>;

export const CheckboxControlled = (props: CheckboxControlledProps) => {
  const methods = useFormContext();

  return (
    <Controller
      name={props.name}
      control={methods.control}
      render={({ field }) => (
        <Checkbox
          {...props}
          ref={props.ref as any}
          isIndeterminate={props.isIndeterminate as any}
          onChange={(ev: any, value: boolean | null) => field.onChange(value)}
          value={field.value}
          onBlur={field.onBlur}
        />
      )}
    />
  );
};

export default Checkbox;
