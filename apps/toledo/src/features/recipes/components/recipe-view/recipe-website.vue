<script setup lang="ts">
import { VForm, VExpansionPanel, VTextField } from 'vuetify/components';
import type { Recipe } from '@/services/api/recipes/recipes.types';
import { intl, isEmptyOrWhitespace } from '@spuxx/js-utils';
import { recipeValidationRules } from '../../validation/recipe.validation-rules';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useRecipesStore } from '../../stores/recipes.store';
import { Interface } from '@/services/interface';
import { Changeset } from '@/utils/changeset.utils';

const store = useRecipesStore();
const { recipe } = defineProps<{
  recipe: Recipe;
}>();

const changeset = ref<Changeset<Recipe>>(new Changeset(recipe));
const form = ref<VForm | undefined>();

async function save() {
  console.log(changeset.value.get('url'));
  console.log(changeset.value.isDirty);
  await changeset.save();
  // if ((await form.value?.validate())?.valid) {
  //   await store.updateRecipe(recipe);
  //   Interface.unfocusActiveElement();
  // }
}
</script>

<template>
  <VExpansionPanel value="website">
    <template v-slot:title>
      <Icon icon="mdi:web" class="mr-2" />
      {{ intl('recipes.route.recipe.website.title') }}
    </template>
    <template v-slot:text>
      <VForm ref="form">
        <VTextField
          type="url"
          :label="intl('recipes.route.recipe.website.url')"
          :model-value="changeset.get('url')"
          @update:model-value="(value) => changeset.set('url', value)"
          :rules="recipeValidationRules.url"
          validate-on="input eager"
          @blur="save"
        />
      </VForm>

      <iframe class="iframe" v-if="recipe.url" :src="recipe.url" width="100%"></iframe>
    </template>
  </VExpansionPanel>
</template>

<style scoped>
.iframe {
  height: 75svh;
}
</style>
