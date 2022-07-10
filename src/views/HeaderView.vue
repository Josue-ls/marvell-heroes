<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand text-light" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div class="d-flex">
          <input
            v-model="heroName"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            @click="searchByName"
            class="btn btn-outline-success"
            :disabled="isHeroName"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#currentHero"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </nav>
  <modal-component>
    <ui-card :hero="hero" class="modal-card" />
  </modal-component>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import store from "@/store";
import ModalComponent from "@/components/utils/ModalComponent.vue";
import UiCard from "@/components/utils/Card/UiCard.vue";

const heroName = ref("");

const isHeroName = computed(() => !(heroName.value.length > 0));

const hero = computed(() => store.getters["heroes/getHero"]);

function searchByName() {
  store.dispatch("heroes/fetchHeroByName", heroName.value);
}
</script>

<style lang="scss" scoped>
.modal-card {
  width: 80%;
}
</style>
