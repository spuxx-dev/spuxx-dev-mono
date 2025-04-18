<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import MarkdownIt from 'markdown-it';
import { VCard, VContainer, VTextarea } from 'vuetify/components';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits<{
  (e: 'change', value: string): void;
}>();
const md = new MarkdownIt({
  breaks: true,
  linkify: true,
});

const rawDiv = ref<HTMLDivElement | undefined>();
const renderedDiv = ref<HTMLDivElement | undefined>();
const raw = ref<string>(props.modelValue);
const rendered = computed(() => {
  return md.render(raw.value);
});
const focused = ref(false);

function handleFocus() {
  focused.value = true;
}
function handleBlur() {
  raw.value = rawDiv.value?.textContent ?? '';
  console.log(raw.value);
  focused.value = false;
  emit('change', raw.value);
}

watch(rawDiv, async () => {
  if (rawDiv.value) {
    rawDiv.value!.focus();
  }
});
</script>

<template>
  <VContainer class="markdown-editor">
    <div
      v-if="!focused"
      ref="renderedDiv"
      class="rendered"
      v-html="rendered"
      contenteditable
      @focus="handleFocus"
    ></div>
    <VTextarea v-else class="raw" ref="rawDiv" v-model="raw" @blur="handleBlur" />
    <!-- <VTextarea
      :bind="$attrs"
      class="textarea"
      variant="outlined"
      :model-value
      @input="$emit('update:modelValue', $event.target.value)"
    ></VTextarea>
    <div :bind="$attrs" class="rendered-content" v-html="renderedMarkdown" contenteditable></div> -->
  </VContainer>
</template>

<style scoped>
.markdown-editor {
  height: fit-content;
}

.raw,
.rendered {
  position: absolute;
  height: 100%;
  width: 100%;
}

.raw {
  white-space: preserve;
}
</style>
