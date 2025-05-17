<script setup lang="ts">
import PageContent from '@/components/content/PageContent.vue';
import { SessionManager } from '@/services/session';
import { useProtection } from '@/router';
import { intl } from '@spuxx/js-utils';
import MainSidebar from '../sidebar/MainSidebar.vue';

useProtection();
const { session } = SessionManager;
// const isThea =
</script>

<template>
  <MainSidebar />
  <PageContent
    v-if="session"
    :title="` ${intl('main.route.index.greeting', { name: session.given_name })}`"
  >
    <div v-if="session.sub === '5bac0409-18a5-4f61-adc1-e0cf9b8dbbf7'">
      Ich liebe Dich. ❤️
    </div>
  </PageContent>
</template>
