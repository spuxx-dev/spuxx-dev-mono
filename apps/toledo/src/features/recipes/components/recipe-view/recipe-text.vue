<script setup lang="ts">
import type { Recipe } from '@/services/api/recipes/recipes.types';
import { intl } from '@spuxx/js-utils';
import { VExpansionPanel, VBtn } from 'vuetify/components';
import markdownIt from 'markdown-it';
import { computed } from 'vue';
import MarkdownEditor from '@/components/input/markdown-editor';
import { Icon } from '@iconify/vue';
import { Dialog } from '@/services/dialog';
import MarkdownEditorDialog, {
  type MarkdownEditorDialogOptions,
} from '@/components/dialog/markdown-editor';

const { recipe } = defineProps<{
  recipe: Recipe;
}>();

const md = markdownIt();
const html = computed(() => {
  return md.render(recipe.text ?? '');
  return;
});

const openEditDialog = () => {
  Dialog.open<MarkdownEditorDialogOptions>(MarkdownEditorDialog, {
    content: recipe.text,
  });
};
</script>

<template>
  <VExpansionPanel value="text">
    <template v-slot:title>
      <Icon icon="mdi:text" class="mr-2" />
      {{ intl('recipes.route.recipe.text.title') }}
    </template>
    <template v-slot:text>
      <p class="mx-4" v-html="html" />
      <VBtn class="mt-4" variant="outlined" @click="openEditDialog">
        {{ intl('recipes.route.recipe.text.edit') }}
      </VBtn>
    </template>
  </VExpansionPanel>
</template>

<style scoped>
.textarea {
  max-height: 50vh;
}
</style>
