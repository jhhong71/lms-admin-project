<template>
  <v-app-bar elevation="0" color="white" height="64" class="border-b">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggle')" color="grey-darken-1"></v-app-bar-nav-icon>
    </template>

    <!-- 동적 브레드크럼 (라우터 정보 연동) -->
    <div class="d-none d-sm-flex align-center text-body-2 text-grey-darken-1 ml-2">
      <span class="cursor-pointer hover:text-black">홈</span>
      
      <!-- 카테고리가 있을 때만 화살표와 카테고리 표시 -->
      <template v-if="category">
        <v-icon icon="mdi-chevron-right" size="small" class="mx-2"></v-icon>
        <span class="cursor-pointer hover:text-black">{{ category }}</span>
      </template>
      
      <!-- 현재 페이지 제목 -->
      <v-icon icon="mdi-chevron-right" size="small" class="mx-2"></v-icon>
      <span class="font-weight-bold text-black">{{ pageTitle }}</span>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center px-4 gap-4">
      <v-btn icon size="small" variant="text" color="grey-darken-1">
        <v-badge dot color="red" offset-x="2" offset-y="2">
          <v-icon icon="mdi-bell-outline"></v-icon>
        </v-badge>
      </v-btn>
      <div class="h-6 w-px bg-gray-200 mx-2"></div>
      <div class="d-flex align-center cursor-pointer">
        <div class="text-right mr-3 d-none d-sm-block">
          <div class="text-subtitle-2 font-weight-bold text-slate-800">김교수</div>
          <div class="text-caption text-grey">컴퓨터공학과</div>
        </div>
        <v-avatar color="blue-lighten-5" size="40" class="border border-blue-100">
          <v-icon color="blue" icon="mdi-account"></v-icon>
        </v-avatar>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineEmits(['toggle']);

// 현재 라우트 정보 가져오기
const route = useRoute();

// meta 정보에서 타이틀과 카테고리 추출 (라우터 설정의 meta 필드 사용)
const pageTitle = computed(() => route.meta.title || 'LMS Admin');
const category = computed(() => route.meta.category || '');
</script>