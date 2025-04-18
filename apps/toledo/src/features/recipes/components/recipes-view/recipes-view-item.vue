<script lang="ts" setup>
import CardGridElement from '@/components/content/card-grid/CardGridElement.vue';
import type { Recipe } from '@/services/api/recipes/recipes.types';

const { recipe } = defineProps<{
  recipe: Recipe;
}>();
</script>

<template>
  <CardGridElement
    :icon="`mdi:${recipe.icon}`"
    :text="recipe.name"
    link
    :to="`/recipes/${recipe.id}`"
  />
</template>

<style scoped></style>
