<template>
  <v-text-field
    :model-value="modelValue"
    :label="label"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    density="compact"
    hide-details="auto"
    bg-color="white"
    color="primary"
    single-line
    clearable
    @update:model-value="$emit('update:modelValue', $event)"
    @click:clear="$emit('update:modelValue', '')"
    @keyup.enter="$emit('search')"
  ></v-text-field>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue';

withDefaults(defineProps<{
  modelValue: string | null;
  label?: string;
}>(), {
  label: '검색어'
});

defineEmits(['update:modelValue', 'search']);
</script>