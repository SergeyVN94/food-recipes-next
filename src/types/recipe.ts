export type AmountType = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updateAt: string;
};

export type RecipeIngredient = {
  id: string;
  slug: string;
  name: string;
  description: string;
  amountTypes: AmountType[];
  createdAt: string;
  updateAt: string;
  image?: string;
};

export type Recipe = {
  id: string;
  title: string;
  slug: string;
  description: string;
  ingredients: RecipeIngredient[];
  images: string[];
  steps: string[];
  createdAt: string;
  updateAt: string;
};

export type RecipeDtoStep = {
  order: number;
  value: string;
};

export type RecipeDtoIngredient = {
  ingredientId: RecipeIngredient['id'];
  amountTypeId: AmountType['id'];
  count: number;
};

export type RecipeDto = {
  title: string;
  description: string;
  images?: FileList | File[];
  steps: RecipeDtoStep[];
  ingredients: RecipeDtoIngredient[];
};
