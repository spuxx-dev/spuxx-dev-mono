<script setup lang="ts">
import { VBtn, VCard, VCardText, VTextarea } from 'vuetify/components';
import DialogTitle from '../template/dialog-title.vue';
import { Dialog, type DialogOptions } from '@/services/dialog';
import type { MarkdownEditorDialogOptions } from './types';
import { intl } from '@spuxx/js-utils';
import { ref } from 'vue';

const { options } = withDefaults(
  defineProps<{
    options: MarkdownEditorDialogOptions;
  }>(),
  {
    options: () => ({
      content: '',
      title: intl('component.dialog.markdown-editor.title'),
      icon: 'mdi:application-edit',
      size: 'medium',
    }),
  },
);

const content = ref<string>(options.content!);

const handleConfirm = () => {
  Dialog.close();
};
</script>
<template>
  <VCard>
    <template v-slot:title>
      <DialogTitle :options />
    </template>
    <template v-slot:default>
      <VCardText> <VTextarea :v-model="content" /></VCardText>
    </template>
    <template v-slot:actions>
      <VBtn variant="text" @click="Dialog.close">{{ intl('misc.cancel') }}</VBtn>
      <VBtn color="primary-darken-1" variant="flat" @click="handleConfirm">{{
        intl('misc.confirm')
      }}</VBtn>
    </template>
  </VCard>
</template>
