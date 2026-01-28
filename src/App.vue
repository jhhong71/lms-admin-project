<template>
  <v-app class="bg-slate-50">
    <TheSidebar :is-open="drawer" @update:is-open="drawer = $event" />
    <TheHeader @toggle="drawer = !drawer" />
    <v-main>
      <v-container fluid class="fill-height align-start pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheSidebar from './components/layout/TheSidebar.vue';
import TheHeader from './components/layout/TheHeader.vue';

const drawer = ref(true);
</script>
