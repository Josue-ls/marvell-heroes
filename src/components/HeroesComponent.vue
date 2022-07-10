<template>
  <div class="container margin-row" ref="scrollComponent">
    <template v-for="item in heroList" :key="item.id">
      <div class="row">
        <template v-for="hero in item.data" :key="hero.id">
          <div class="col">
            <ui-card :hero="hero" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import store from "@/store";
import { computed, onMounted, watch } from "vue";
import UiCard from "./utils/Card/UiCard.vue";

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

watch(scroll, () => {
  console.log(scroll);
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
      fetchHeroes();
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
}
</style>
