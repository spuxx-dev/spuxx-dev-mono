<script setup lang="ts">
import { intl } from '@spuxx/js-utils';
import { VCol, VExpansionPanel, VExpansionPanels, VForm, VRow, VSwitch } from 'vuetify/components';
import { Icon } from '@iconify/vue/dist/iconify.js';
import ValidatedTextField from '@/components/input/ValidatedTextField.vue';
import { computed, useTemplateRef } from 'vue';
import { SessionManager } from '@/services/session';
import type { List, UpdatedList } from '@/services/api/lists/lists.types';
import { listValidationRules } from '../../../validation/list.validation-rules';
import { Interface } from '@/services/interface';
import DeleteList from './DeleteList.vue';
import ShareList from './ShareList.vue';
import IconSearch from '@/components/input/IconSearch.vue';

const { list, update } = defineProps<{
  list: List;
  update: (updateList: UpdatedList) => Promise<List>;
}>();
const form = useTemplateRef('form');

const isOwned = computed(() => {
  return list.owner.id === SessionManager.session.value?.sub;
});

async function handleUpdate() {
  if ((await form.value?.validate())?.valid) {
    await update(list);
    Interface.unfocusActiveElement();
  }
}
</script>

<template>
  <VExpansionPanels v-if="isOwned && list" color="surface">
    <VExpansionPanel class="settings">
      <template v-slot:title>
        <Icon icon="mdi:cog" class="mr-2" />
        {{ intl('lists.route.list.settings.title') }}
      </template>
      <template v-slot:text>
        <VForm ref="form" @submit.prevent="handleUpdate">
          <VRow no-gutters>
            <VCol>
              <ValidatedTextField
                :label="intl('lists.route.list.settings.name.label')"
                v-model="list.name"
                :rules="listValidationRules.settings.name"
                validate-on="input eager"
                @change="handleUpdate"
              />
            </VCol>
            <VCol>
              <IconSearch v-model="list.icon" @select="handleUpdate"></IconSearch>
              <!-- <VAutocomplete
                :label="intl('lists.route.list.settings.icon.label')"
                :items="icons"
                v-model="list.icon"
                :rules="listValidationRules.settings.icon"
                validate-on="input eager"
                auto-select-first="exact"
                @update:search.self="handleIconSearch"
                @update:model-value="handleUpdate"
              /> -->
            </VCol>
          </VRow>
          <VRow no-gutters>
            <VCol>
              <VSwitch
                :label="intl('lists.route.list.settings.uses-quantities.label')"
                v-model="list.usesQuantities"
                @update:model-value="handleUpdate"
                hide-details
              />
            </VCol>
            <VCol>
              <VSwitch
                :label="intl('lists.route.list.settings.uses-checkboxes.label')"
                v-model="list.usesCheckboxes"
                @change="handleUpdate"
                hide-details
              />
            </VCol>
            <VCol>
              <VSwitch
                :label="intl('lists.route.list.settings.requires-delete-confirmation.label')"
                v-model="list.requiresDeleteConfirmation"
                @change="handleUpdate"
                hide-details
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <ShareList :list="list" />
            </VCol>
            <VCol>
              <DeleteList :list="list" />
            </VCol>
          </VRow>
          <button type="submit" hidden></button>
        </VForm>
      </template>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.settings {
  text-align: initial;

  :global(.v-col) {
    min-width: 12rem;
  }
}
</style>
