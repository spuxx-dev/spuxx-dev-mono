<script setup lang="ts">
import { ref } from 'vue';
import type { Recipe } from '@/services/api/recipes/recipes.types';
import { intl } from '@spuxx/js-utils';
import { recipeValidationRules } from '../../validation/recipe.validation-rules';
import { VForm, VExpansionPanel, VTextField } from 'vuetify/components';
import IconSearch from '@/components/input/IconSearch.vue';
import { Interface } from '@/services/interface';
import { useRecipesStore } from '../../stores/recipes.store';
import { Icon } from '@iconify/vue';

const { recipe } = defineProps<{
  recipe: Recipe;
}>();

const store = useRecipesStore();
const form = ref<VForm | null>(null);

async function save() {
  if ((await form.value?.validate())?.valid) {
    await store.updateRecipe(recipe);
    Interface.unfocusActiveElement();
  }
}
</script>

<template>
  <VExpansionPanel value="general">
    <template v-slot:title>
      <Icon icon="mdi:info" class="mr-2" />
      {{ intl('recipes.route.recipe.general.title') }}
    </template>
    <template v-slot:text>
      <VForm ref="form">
        <VTextField
          class="mt-2"
          :label="intl('recipes.route.recipe.general.name')"
          :model-value="recipe.name"
          :rules="recipeValidationRules.name"
          validate-on="input lazy"
          @change="save"
        />
        <IconSearch v-model="recipe.icon" @select="save"></IconSearch>
      </VForm>
    </template>
  </VExpansionPanel>
</template>

<style scoped></style>
