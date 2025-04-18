<script setup lang="ts">
import PageContent from '@/components/content/PageContent.vue';
import RecipesSidebar from '../sidebar/recipes.sidebar.vue';
import RecipesView from '../components/recipes-view/recipes-view.vue';
</script>

<template>
  <RecipesSidebar />
  <PageContent no-padding>
    <RecipesView />
  </PageContent>
</template>

<style scoped></style>
