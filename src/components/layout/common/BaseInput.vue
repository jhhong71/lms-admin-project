<template>
  <v-text-field
    :model-value="modelValue"
    :label="label"
    :placeholder="placeholder"
    variant="outlined"
    density="compact"
    hide-details="auto"
    bg-color="white"
    color="primary"
    single-line
    @update:model-value="$emit('update:modelValue', $event)"
  ></v-text-field>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  modelValue: string | number | null;
  label?: string;
  placeholder?: string;
}>();

defineEmits(['update:modelValue']);
</script>