<template>
  <div class="mb-4 mt-4">
    <div class="card bg-dark card-back">
      <img :src="img" class="background-card" />

      <div class="card-body back-body">
        <h5 class="card-title">{{ props?.hero?.name }}</h5>
        <p class="card-text"></p>
      </div>
      <div class="card-body back-body">
        <p class="card-desc">{{ description }}</p>
        <ui-btn
          @click="setCurrentHero"
          data-bs-toggle="modal"
          data-bs-target="#updateHero"
          text="Editar"
          css-class="btn-light"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { Hero } from "@/types/hero";
import { computed, defineProps } from "vue";
import UiBtn from "../UiBtn.vue";

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

function setCurrentHero() {
  store.commit("heroes/setHero", props.hero);
}
</script>

<style lang="scss" scoped>
.card-back {
  position: relative;
  height: 100%;
  color: white;
  z-index: 10;
}

.back-body {
  z-index: 20;
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
