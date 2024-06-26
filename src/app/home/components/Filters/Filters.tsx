'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useRecipeIngredients } from '@/hooks';
import { Button } from '@/components/ui';

import IngredientsFilter from './IngredientsFilter';
import { searchParamsToFormFields } from './lib';
import { FormFields } from './types';

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { data: ingredients = [], isFetching: isIngredientsFetching } = useRecipeIngredients();
  const values = React.useMemo(
    () => searchParamsToFormFields({ params: searchParams, ingredients: ingredients ?? [] }),
    [searchParams, ingredients],
  );

  const defaultValues: FormFields = React.useMemo(() => {
    return {
      ingredients: (ingredients ?? []).map((item, index) => ({
        id: item.id,
        name: item.name,
        value: false,
      })),
    };
  }, [ingredients]);

  const methods = useForm<FormFields>({
    values,
    defaultValues,
  });

  const handleSubmit = (formFields: FormFields) => {
    const nextParams = new URLSearchParams();

    if (searchParams.get('q')) {
      nextParams.set('q', searchParams.get('q') ?? '');
    }

    formFields.ingredients.forEach((ingredient) => {
      if (ingredient.value) {
        nextParams.append('ingr-inc[]', ingredient.id);
      }

      if (ingredient.value === null) {
        nextParams.append('ingr-exc[]', ingredient.id);
      }
    });

    replace(`${pathname}?${nextParams.toString()}`);
  };

  const handleReset = () => {
    methods.reset(defaultValues);
    handleSubmit(defaultValues);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="w-full sticky top-4 bottom-4 h-[calc(100vh-8rem)] max-h-[80rem] overflow-hidden z-10"
      >
        <h3 className="headline-m">Фильтры</h3>
        <div className="pt-4 h-[calc(100%-5rem)] overflow-y-auto">
          <IngredientsFilter />
        </div>
        <div className="flex flex-nowrap items-center gap-3 mt-auto z-30 relative bg-white">
          <Button type="submit">Применить</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Очистить
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Filters;
