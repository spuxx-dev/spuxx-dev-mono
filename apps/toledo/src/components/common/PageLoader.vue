<script setup lang="ts">
import type { ResourceState } from '@/reactivity/resource';
import { type Ref } from 'vue';
import Loader from './Loader.vue';

defineProps<{
  state?: ResourceState | Ref<ResourceState>;
}>();
</script>

<template>
  <Loader class="loader" type="spinner" :state />
</template>
<style scoped>
.loader {
  position: fixed;
  left: 50%;
  top: 33%;
  transform: translate(-50%, -33%);
}
</style>
