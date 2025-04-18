<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import { useRecipesStore } from '../../stores/recipes.store';
import { ref, computed } from 'vue';
import { Resource } from '@/reactivity/resource';
import { type Recipe } from '@/services/api/recipes/recipes.types';
import ResourceView from '@/components/common/ResourceView.vue';
import RecipeGeneral from './recipe-general.vue';
import RecipeText from './recipe-text.vue';
import RecipeWebsite from './recipe-website.vue';
import { VExpansionPanels } from 'vuetify/components';
import { intl, isEmptyOrWhitespace } from '@spuxx/js-utils';

const { id } = defineProps<{
  id: string;
}>();

const panels = ref<string[]>([]);
const store = useRecipesStore();
const recipe = computed(() => store.byId(id));
const resource = new Resource(async (id: string) => {
  const result = await store.fetchById(id);
  if (!result) return;
  if (!isEmptyOrWhitespace(result.text)) {
    panels.value.push('text');
  }
  if (!isEmptyOrWhitespace(result.url)) {
    panels.value.push('website');
  }
  return result;
}, 'active-list');
resource.load(id);
</script>

<template>
  <ContentHeader
    v-if="recipe"
    :title="recipe.name || intl('recipes.route.recipe.title')"
    :icon="`mdi:${recipe.icon}`"
  />
  <ResourceView :resource>
    <VExpansionPanels v-if="recipe" v-model="panels" multiple>
      <RecipeGeneral :recipe />
      <RecipeText :recipe />
      <RecipeWebsite :recipe />
    </VExpansionPanels>
  </ResourceView>
</template>
