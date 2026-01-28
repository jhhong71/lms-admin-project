<template>
  <v-select
    :model-value="modelValue"
    :items="items"
    :label="label"
    variant="outlined"
    density="compact"
    hide-details="auto"
    bg-color="white"
    color="primary"
    @update:model-value="$emit('update:modelValue', $event)"
  ></v-select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  modelValue: any;
  items: any[];
  label?: string;
}>();

defineEmits(['update:modelValue']);
</script>