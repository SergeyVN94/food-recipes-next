import { AxiosRequestConfig } from 'axios';
import merge from 'lodash-es/merge';

import { Recipe, RecipeDto } from '@/types';
import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/recipes';

class RecipeService {
  static getRecipes(search?: string, config: AxiosRequestConfig = {}) {
    return apiInstance.get<Recipe[]>(
      `${BASE_API_URL}`,
      merge(
        {
          params: {
            q: search,
          },
        },
        config,
      ),
    );
  }

  static postRecipe(dto: RecipeDto, config: AxiosRequestConfig = {}) {
    const formData = new FormData();

    const steps = dto.steps.sort((a, b) => (a.order < b.order ? -1 : 1)).map((i) => i.value);

    formData.set('title', dto.title);
    formData.set('description', dto.description);
    Array.from(dto.images ?? [])?.forEach((image) => {
      formData.append('images', image);
    });
    steps.forEach((step, index) => {
      formData.append(`steps[${index}]`, step);
    });
    formData.append('tags[]', '');

    return apiInstance.post<Recipe>(
      `${BASE_API_URL}`,
      formData,
      merge(
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        config,
      ),
    );
  }
}

export default RecipeService;
