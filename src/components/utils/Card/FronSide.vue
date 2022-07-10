<template>
  <div class="mb-4 mt-4">
    <div class="card card-front">
      <img :src="img" class="card-img-top" style="height: 20rem" />

      <div class="card-body">
        <h5 class="card-title">{{ props.hero?.name }}</h5>
        <p class="card-text">
          {{ datetime }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import moment from "moment";
import { Hero } from "@/types/hero";

const props = defineProps<{
  hero: Hero;
}>();

const img = computed(
  () => `${props.hero?.thumbnail.path}.${props.hero?.thumbnail.extension}`
);

const datetime = computed(() => {
  const date = new Date(props.hero?.modified);
  const newDate = moment(date).format("DD-MM-YYYY");
  return newDate;
});
</script>

<style lang="scss" scoped>
.card-front {
  height: 100%;
}
.hero-img {
  width: 100%;
  height: 50%;
}
</style>
