<script setup lang="ts">
import { Dialog, type DialogOptions } from '@/services/dialog';
import { VCard, VCardText } from 'vuetify/components';
import { intl } from '@spuxx/js-utils';

const { options } = withDefaults(
  defineProps<{
    options: DialogOptions;
  }>(),
  {
    options: () =>
      ({
        size: 'small',
        persistent: false,
      }) as DialogOptions,
  },
);
</script>

<template>
  <VDialog
    :model-value="true"
    close-on-back
    :max-width="options.size"
    :persistent="options.persistent"
  >
    <VCard>
      <template v-slot:title>
        <DialogTitle :options />
      </template>
      <template v-slot:default>
        <VCardText>
          <slot name="content"></slot>
        </VCardText>
      </template>
      <template v-slot:actions>
        <VBtn variant="text" @click="Dialog.close">{{ intl('misc.cancel') }}</VBtn>
        <VBtn color="primary-darken-1" variant="flat" @click="handleConfirm">{{
          intl('misc.confirm')
        }}</VBtn>
      </template>
    </VCard>
  </VDialog>
</template>
