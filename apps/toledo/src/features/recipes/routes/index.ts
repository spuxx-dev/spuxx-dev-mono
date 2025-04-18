import type { RouteRecordRaw } from 'vue-router';
import RecipesRoute from './recipes.route.vue';
import RecipeRoute from './recipe.route.vue';
import { intl } from '@spuxx/js-utils';

export const recipesRoutes: RouteRecordRaw[] = [
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipesRoute,
    meta: {
      title: intl('recipes.route.index.title'),
      description: intl('recipes.route.index.description'),
    },
  },
  {
    path: '/recipes/:id',
    name: 'recipe',
    component: RecipeRoute,
    meta: {
      title: intl('recipes.route.recipe.title'),
      description: intl('recipes.route.recipe.description'),
    },
  },
];
