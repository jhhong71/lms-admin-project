<template>
  <v-navigation-drawer v-model="isOpen" color="slate-800" theme="dark" width="260" style="background-color: #1e293b; border: none;">
    <div class="d-flex align-center px-6" style="height: 64px; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <v-icon icon="mdi-school" color="blue" class="mr-3"></v-icon>
      <span class="text-h6 font-weight-bold text-white">LMS Admin</span>
    </div>
    <v-list nav class="mt-2">
      <v-list-subheader class="text-uppercase font-weight-bold text-caption text-grey">학사 관리</v-list-subheader>
      <v-list-item prepend-icon="mdi-presentation" title="강의 개설 현황" to="/" color="primary" rounded="lg"></v-list-item>
      <v-list-item prepend-icon="mdi-account-school" title="수강생 관리" to="/students" color="primary" rounded="lg"></v-list-item>
      <v-list-item prepend-icon="mdi-human-male-board" title="교수진 관리" to="/professors" color="primary" rounded="lg"></v-list-item>
      <v-list-subheader class="mt-4 text-uppercase font-weight-bold text-caption text-grey">시스템</v-list-subheader>
      <v-list-item prepend-icon="mdi-chart-bar" title="통계 대시보드" to="/stats" color="primary" rounded="lg"></v-list-item>
      <v-list-item prepend-icon="mdi-cog" title="설정" to="/settings" color="primary" rounded="lg"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['update:isOpen']);
const isOpen = computed({ get: () => props.isOpen, set: (val) => emit('update:isOpen', val) });
</script>
