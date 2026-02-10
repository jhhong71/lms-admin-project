<template>
  <v-text-field
    v-model="model"
    :label="label"
    prepend-inner-icon="mdi-magnify"
    single-line
    clearable
    hide-details
    bg-color="white"
    density="compact"
    variant="outlined"
    color="primary"
    @keyup.enter="$emit('search')"
    @click:clear="$emit('search')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  label?: string;
}>();

const emit = defineEmits(['update:modelValue', 'search']);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>