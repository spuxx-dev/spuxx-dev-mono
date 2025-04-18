import { Api } from '@/services/api';
import type { Recipe } from '@/services/api/recipes/recipes.types';
import { Logger } from '@spuxx/js-utils';
import { defineStore } from 'pinia';

interface State {
  recipes: Recipe[];
}

const storeName = 'Store (recipes)';
export const useRecipesStore = defineStore(storeName, {
  state: (): State => {
    return { recipes: [] };
  },
  getters: {
    all(state): Recipe[] {
      return state.recipes.sort((a, b) => a.name.localeCompare(b.name));
    },
    byId: (state) => {
      return (id: string): Recipe | undefined => {
        return state.recipes.find((recipe) => recipe.id === id);
      };
    },
  },
  actions: {
    /**
     * Fetches all recipes the user has access to and updates the cached
     * list of recipes.
     * @param options More options.
     * @returns The recipes.
     */
    async fetch(options?: StoreFetchOptions): Promise<Recipe[]> {
      if (this.recipes.length > 1 && !options?.reload) return this.recipes;
      const recipes = (await Api.findManyRecipes()) ?? [];
      if (this.recipes.length > 0) {
        for (const recipe of recipes) {
          const existingRecipe = this.recipes.find((element) => element.id === recipe.id);
          if (existingRecipe) {
            Object.assign(existingRecipe, recipe);
          } else {
            this.recipes.push(recipe);
          }
        }
      } else {
        this.$state = { recipes };
      }

      Logger.debug(`Retrieved ${recipes.length} recipes.`, storeName);
      return this.all;
    },
    /**
     * Fetches a single recipe and updates the cached list of recipes.
     * @param id The id of the recipe.
     * @returns The recipe.
     */
    async fetchById(id: string): Promise<Recipe> {
      const recipe = await Api.findRecipeById(id);
      const existingRecipe = this.recipes.find((element) => element.id === id);
      if (existingRecipe) {
        Object.assign(existingRecipe, recipe);
      } else {
        this.recipes = [...this.$state.recipes, recipe];
      }
      return recipe;
    },
    /**
     * Updates and saves a recipe.
     * @param recipe The new state of the recipe.
     * @returns The updated recipe.
     */
    async updateRecipe(recipe: Recipe): Promise<Recipe> {
      const cachedRecipe = this.byId(recipe.id);
      if (!cachedRecipe) {
        throw new Error(`Recipe with id '${recipe.id}' not found.`);
      }
      const updatedRecipe = await Api.updateRecipe(recipe);
      Object.assign(cachedRecipe, updatedRecipe);
      return cachedRecipe;
    },
    // /**
    //  * Creates a new recipe.
    //  * @returns The newly created recipe.
    //  */
    // async create(recipe: NewList): Promise<List> {
    //   const createdList = await Api.createList(recipe);
    //   Logger.debug(`Created new recipe '${createdList.id}'.`, storeName);
    //   this.recipes = [...this.$state.recipes, createdList];
    //   return createdList;
    // },
    // /**
    //  * Deletes a recipe.
    //  * @param id The recipe id.
    //  */
    // async delete(id: string): Promise<void> {
    //   const recipe = this.recipes.find((element) => element.id === id);
    //   if (!recipe) return;
    //   await Api.deleteList(id);
    //   const index = this.recipes.indexOf(recipe);
    //   this.recipes.splice(index, 1);
    //   Logger.debug(`Deleted recipe '${id}'.`, storeName);
    //   const activeListStore = useActiveListStore();
    //   if (activeListStore.recipe?.id === recipe.id) activeListStore.clear();
    // },
  },
});
