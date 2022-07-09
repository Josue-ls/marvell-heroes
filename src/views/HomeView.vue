<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import store from "@/store";
import HelloWorld from "@/components/HelloWorld.vue";

store.dispatch("heroes/fetchHeroes");
const heroes = computed(() => store.getters["heroes/getHeroes"]);
console.log(heroes.value);
</script>
