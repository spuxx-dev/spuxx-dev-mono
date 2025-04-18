<script setup lang="ts">
import PageContent from '@/components/content/PageContent.vue';
import RecipesSidebar from '../sidebar/recipes.sidebar.vue';
import RecipeView from '../components/recipe-view/recipe-view.vue';
import { useProtection } from '@/router';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { ref } from 'vue';

useProtection();
const route = useRoute();
const recipeId = ref<string>(route.params.id as string);

watch(
  () => route.params.id,
  (newId) => {
    recipeId.value = newId as string;
  },
);
</script>

<template>
  <RecipesSidebar />
  <PageContent>
    <RecipeView :id="recipeId" />
  </PageContent>
</template>

<style scoped></style>
