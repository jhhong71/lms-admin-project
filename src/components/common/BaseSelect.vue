<template>
  <v-select
    v-model="model"
    :items="items"
    :label="label"
    variant="outlined"
    density="compact"
    hide-details="auto"
    bg-color="white"
    color="primary"
  ></v-select>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: any;
  items: any[];
  label?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>