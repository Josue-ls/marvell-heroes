<template>
  <button class="btn" :class="props.cssClass" type="button">
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  text: string;
  cssClass: string;
}>();
</script>

<style></style>
