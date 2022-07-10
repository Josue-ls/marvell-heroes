<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand text-light" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li
            class="nav-item cursor"
            data-bs-toggle="modal"
            data-bs-target="#newHero"
          >
            <span class="new-hero">Agregar Heroe</span>
          </li>
        </ul>
        <div class="d-flex">
          <ui-input v-model="heroName" placeholder="Nombre" />

          <ui-btn
            data-bs-toggle="modal"
            data-bs-target="#currentHero"
            @click="searchByName"
            :disabled="isHeroName"
            text="Buscar"
            css-class="btn-outline-success"
          >
          </ui-btn>
        </div>
      </div>
    </div>
  </nav>

  <modal-component id-modal="currentHero" :title-modal="hero.name">
    <ui-card :hero="hero" />
  </modal-component>
  <modal-component id-modal="newHero" title-modal="Agregar Nuevo Heroe">
    <div>Hola</div>
  </modal-component>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import store from "@/store";
import ModalComponent from "@/components/utils/ModalComponent.vue";
import UiCard from "@/components/utils/Card/UiCard.vue";
import UiBtn from "@/components/utils/UiBtn.vue";
import UiInput from "@/components/utils/UiInput.vue";

const heroName = ref("");

const isHeroName = computed(() => !(heroName.value.length > 0));

const hero = computed(() => store.getters["heroes/getHero"]);

function searchByName() {
  store.dispatch("heroes/fetchHeroByName", heroName.value);
}
</script>

<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
.new-hero {
  color: #fff;
  font-size: medium;
}
.modal-card {
  width: 80%;
}
</style>
