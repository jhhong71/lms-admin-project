<template>
  <v-btn
    :color="color"
    :variant="variant"
    :size="size"
    :block="block"
    :prepend-icon="prependIcon"
    :icon="icon"
    :disabled="disabled"
    :class="customClass"
    @click="$emit('click', $event)"
  >
    <!-- 슬롯 사용 -->
    <slot>{{ label }}</slot>
  </v-btn>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

// Props 정의 (기본값 설정으로 코드 중복 감소)
withDefaults(defineProps<{
  label?: string;
  color?: string;
  variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain';
  size?: string;
  block?: boolean;
  prependIcon?: string;
  icon?: string | boolean;
  disabled?: boolean;
  customClass?: string;
}>(), {
  color: undefined, // 기본: Vuetify theme color or default
  variant: 'flat',  // 기본: Flat 스타일
  size: 'small',    // 기본: Small 
  block: false,
  disabled: false,
  customClass: 'text-capitalize font-weight-bold' // 기본 스타일 클래스
});

defineEmits(['click']);
</script>