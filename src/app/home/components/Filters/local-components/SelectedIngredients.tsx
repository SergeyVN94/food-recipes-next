'use client';

import { IconDelete } from '@/assets/icons';
import { ButtonIcon } from '@/components/ui';
import { RecipeIngredient } from '@/types';

import { FormFields } from '../Filters.types';

type SelectedIngredientsProps = {
  selectedIngredients: FormFields['includesIngredients'];
  ingredientsMap: Map<string, RecipeIngredient>;
  onDelete: (id: string) => void;
};

const SelectedIngredients = ({ selectedIngredients, ingredientsMap, onDelete }: SelectedIngredientsProps) => {
  const ingredientsCards = Object.keys(selectedIngredients).reduce<React.ReactNode[]>((acc, ingredientId) => {
    if (selectedIngredients[ingredientId]) {
      acc.push(
        <div key={ingredientId} className="flex items-center flex-1 justify-start">
          <p className="body-l mx-2">{ingredientsMap.get(ingredientId)?.name}</p>
          <ButtonIcon onClick={() => onDelete(ingredientId)} className="ml-auto">
            <IconDelete />
          </ButtonIcon>
        </div>,
      );
    }

    return acc;
  }, []);

  return ingredientsCards.length > 0 ? (
    <div className="flex flex-col border-b border-t max-h-[12rem] overflow-y-auto">{ingredientsCards}</div>
  ) : null;
};

export default SelectedIngredients;
