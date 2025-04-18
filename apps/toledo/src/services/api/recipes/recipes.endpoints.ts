import { defineEndpoint, transformFetchJson } from '@spuxx/js-utils';
import { Api } from '../api.service';
import type { AppConfig } from '@/config/app.config';
import { Config } from '@spuxx/browser-utils';
import type { Recipe } from './recipes.types';

export const recipesEndpoints = {
  findManyRecipes: defineEndpoint({
    function: async (): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/recipes`, Api.requestOptions);
    },
    transformer: transformFetchJson<Recipe[]>,
  }),
  findRecipeById: defineEndpoint({
    function: async (id: string): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/recipes/${id}`, Api.requestOptions);
    },
    transformer: transformFetchJson<Recipe>,
  }),
  updateRecipe: defineEndpoint({
    function: async (recipe: Partial<Recipe & { id: string }>): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/recipes/${recipe.id}`, {
        ...Api.requestOptions,
        method: 'PATCH',
        body: JSON.stringify(recipe),
      });
    },
    transformer: transformFetchJson<Recipe>(),
  }),
};
