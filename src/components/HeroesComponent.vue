<template>
  <div class="container margin-row">
    <template v-for="item in heroList" :key="item.id">
      <div class="row">
        <template v-for="hero in item.data" :key="hero.id">
          <div class="col">
            <ui-card :hero="hero" />
          </div>
        </template>
      </div>
    </template>
    <div v-if="isLoading" class="spinner-border mb-4" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <modal-component id-modal="updateHero" title-modal="Editar Heroe">
    <form-heroes />
  </modal-component>
</template>

<script lang="ts" setup>
import store from "@/store";
import { computed, onMounted, ref, watch } from "vue";
import UiCard from "./utils/Card/UiCard.vue";
import ModalComponent from "@/components/utils/ModalComponent.vue";
import FormHeroes from "@/components/FormHeroes.vue";

const isLoading = ref<boolean>(true);
const isScroll = ref<boolean>(true);

onMounted(() => {
  fetchHeroes();
  infiniteScroll();
});

const heroList = computed(() => {
  const array = store.getters["heroes/getHeroes"];
  let newArray: any = [];
  const arrayLength = array.length / 3;
  for (let x = 0; x <= arrayLength - 1; x++) {
    newArray.push({ id: x + 1, data: [] });
    for (let y = 0; y <= 2; y++) {
      newArray[x].data = [...newArray[x].data, ...[array[y + 3 * x]]];
    }
  }

  return newArray;
});

watch(heroList, () => {
  isLoading.value = false;
  isScroll.value = true;
});

function fetchHeroes() {
  store.dispatch("heroes/fetchHeroes");
}

function infiniteScroll() {
  window.onscroll = () => {
    let bottomOfWindow =
      Math.round(document.documentElement.scrollTop + window.innerHeight) ===
      document.documentElement.offsetHeight;

    if (bottomOfWindow) {
      isLoading.value = true;
      isScroll.value && fetchHeroes();
      isScroll.value = false;
    }
  };
}
</script>

<style lang="scss" scoped>
.margin-row {
  & > * {
    margin-bottom: 45rem;
  }

  &:not(:first-child) {
    margin-bottom: 5rem;
  }

  &:last-child {
    margin-bottom: 2rem;
  }
}
</style>
