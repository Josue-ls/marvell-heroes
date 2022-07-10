<template>
  <input
    @input="($event) => updateModelValue($event)"
    :value="state.modelValue"
    class="form-control form-control-sm me-2"
    :class="cssClass"
    type="text"
    :placeholder="placeholder"
    :aria-label="placeholder"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, onMounted } from "vue";

const props = defineProps<{
  modelValue: string;
  placeholder: string;
  cssClass?: string;
}>();

const state = reactive({
  modelValue: props.modelValue,
});

const emits = defineEmits<{
  (event: "update:modelValue", data: string): void;
}>();

function updateModelValue(event: any) {
  state.modelValue = event.target.value;
  emits("update:modelValue", state.modelValue);
}
</script>

<style></style>
