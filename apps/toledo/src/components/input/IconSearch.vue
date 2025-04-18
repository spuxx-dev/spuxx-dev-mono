<script setup lang="ts">
import { Api } from '@/services/api';
import { intl, isEmptyOrWhitespace } from '@spuxx/js-utils';
import { ref } from 'vue';
import { VAutocomplete } from 'vuetify/components';

const emit = defineEmits<{
  (e: 'select', value: string): void;
}>();

const value = ref<string>('');
const icons = ref<string[]>([]);

async function handleSearch(value: string) {
  if (!value || isEmptyOrWhitespace(value) || value.length < 1) return;
  icons.value = [...(await Api.findManyIcons(value))];
}

async function handleUpdate(newValue: string) {
  value.value = newValue;
  emit('select', newValue);
}
</script>

<template>
  <VAutocomplete
    :bind="$attrs"
    :label="intl('component.input.icon-search.label')"
    :items="icons"
    v-model="value"
    validate-on="input eager"
    auto-select-first="exact"
    @update:search.self="handleSearch"
    @update:model-value="handleUpdate"
  />
</template>

<style scoped></style>
