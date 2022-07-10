<template>
  <div class="mb-4 mt-4">
    <div class="card bg-dark card-back">
      <img :src="img" class="background-card" />

      <div class="card-body">
        <h5 class="card-title">{{ props?.hero?.name }}</h5>
        <p class="card-text"></p>
      </div>
      <div class="card-body">
        <p class="card-desc">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Hero } from "@/types/hero";
import { defineProps, computed } from "vue";

const props = defineProps<{
  hero: Hero;
}>();

const img = computed(
  () => `${props.hero?.thumbnail.path}.${props.hero?.thumbnail.extension}`
);

const description = computed(() => {
  if (props.hero?.description.length === 0) return "";
  return `${props.hero?.description.substring(0, 300)}...`;
});
</script>

<style lang="scss" scoped>
.card-back {
  position: relative;
  height: 100%;
  color: white;
}
.card-desc {
  text-align: justify;
}
.background-card {
  opacity: 0.3;
  position: absolute;
  filter: blur(20px);
  height: 40rem;
  width: 100%;
}
</style>
