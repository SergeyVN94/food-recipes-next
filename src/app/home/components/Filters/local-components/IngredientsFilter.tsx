'use client';

import React from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { IngredientDto } from '@/types';

import { FormFields } from '../Filters.types';
import Accordion from './Accordion';
import FiltersSection from './FiltersSection';
import IngredientsList from './IngredientsList';

type IngredientsFilterProps = {
  ingredients?: IngredientDto[] | null;
};

const IngredientsFilter = ({ ingredients }: IngredientsFilterProps) => {
  const methods = useFormContext<FormFields>();

  const ingredientsMap: Map<number, IngredientDto> = React.useMemo(
    () => ingredients?.reduce((acc, ingredient) => acc.set(ingredient.id, ingredient), new Map<number, IngredientDto>()) ?? new Map(),
    [ingredients],
  );

  const selectedIncludesIngredients = useWatch({
    name: 'includesIngredients',
    control: methods.control,
  });

  const selectedExcludesIngredients = useWatch({
    name: 'excludesIngredients',
    control: methods.control,
  });

  const allSelectedIngredients = React.useMemo(
    () => ({ ...selectedIncludesIngredients, ...selectedExcludesIngredients }),
    [selectedIncludesIngredients, selectedExcludesIngredients],
  );

  const handleIncludeClick = (id: IngredientDto['id']) => {
    methods.setValue('includesIngredients', {
      ...selectedIncludesIngredients,
      [id]: true,
    });
  };

  const handleExcludeClick = (id: IngredientDto['id']) => {
    methods.setValue('excludesIngredients', {
      ...selectedExcludesIngredients,
      [id]: true,
    });
  };

  const handleDeleteClick = (id: IngredientDto['id']) => {
    if (selectedIncludesIngredients[id]) {
      const nextSelected = { ...selectedIncludesIngredients };
      delete nextSelected[id];

      methods.setValue('includesIngredients', nextSelected);
    }

    if (selectedExcludesIngredients[id]) {
      const nextSelected = { ...selectedExcludesIngredients };
      delete nextSelected[id];

      methods.setValue('excludesIngredients', nextSelected);
    }
  };

  return (
    <FiltersSection title="Ингредиенты">
      <Accordion label="Добавить ингредиенты">
        <IngredientsList
          ingredients={ingredients}
          ingredientsMap={ingredientsMap}
          selectedIngredients={selectedIncludesIngredients}
          allSelectedIngredients={allSelectedIngredients}
          onAddIngredient={handleIncludeClick}
          onDeleteIngredient={handleDeleteClick}
        />
      </Accordion>
      <Accordion label="Исключить ингредиенты">
        <IngredientsList
          ingredients={ingredients}
          ingredientsMap={ingredientsMap}
          allSelectedIngredients={allSelectedIngredients}
          selectedIngredients={selectedExcludesIngredients}
          onAddIngredient={handleExcludeClick}
          onDeleteIngredient={handleDeleteClick}
        />
      </Accordion>
    </FiltersSection>
  );
};

export default IngredientsFilter;
