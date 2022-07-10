<template>
  <div class="maincard">
    <front-side
      class="maincard__side maincard__side--front"
      :hero="props.hero"
    ></front-side>
    <back-side
      class="maincard__side maincard__side--back"
      :hero="props.hero"
    ></back-side>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import FrontSide from "./FronSide.vue";
import BackSide from "./BackSide.vue";
import { Hero } from "@/types/hero";

const props = defineProps<{
  hero: Hero;
}>();
</script>

<style lang="scss" scoped>
.maincard {
  perspective: 150rem;
  position: relative;

  &__side {
    height: 40rem;
    width: 100%;
    transition: all 0.8s;
    position: absolute;
    backface-visibility: hidden;
    border-radius: 5px;
    box-shadow: 0 1rem 2rem rgba(#000, 0.15);

    &--back {
      transform: rotateY(180deg);
    }
  }

  &:hover &__side--front {
    transform: rotateY(-180deg);
  }
  &:hover &__side--back {
    transform: rotateY(0deg);
  }
}
</style>
