<script setup lang="ts">
import { intl } from '@spuxx/js-utils';
import { VContainer } from 'vuetify/components';
import { useRecipesStore } from '../../stores/recipes.store';
import { Resource } from '@/reactivity/resource';
import type { Recipe } from '@/services/api/recipes/recipes.types';
import RecipesViewItem from './recipes-view-item.vue';
import CardGrid from '@/components/content/card-grid/CardGrid.vue';

const store = useRecipesStore();
const resource = new Resource<Recipe[]>(() => {
  return store.fetch();
}, 'recipes');
resource.load();
</script>

<template>
  <VContainer>
    <h1 class="magelove mb-4">{{ intl(`recipes.route.index.title`) }}</h1>
    <CardGrid>
      <RecipesViewItem v-for="recipe in store.all" :recipe="recipe" />
    </CardGrid>
  </VContainer>
</template>

<style scoped></style>
