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
            @click="clearCurrentHero"
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
    <div class="card-by-hero">
      <ui-card v-if="hero.id" :hero="hero" :key="hero.id" />
      <div class="jumbotron" v-else>
        <h3 class="display-4">Heroe no encontrado :(</h3>
        <p class="lead">
          El heroe que buscas no se encuentra en nuestra lista, quizas sea de
          otro multiverso o del universo DC.
        </p>
      </div>
    </div>
  </modal-component>
  <modal-component id-modal="newHero" title-modal="Agregar Nuevo Heroe">
    <form-heroes action="Guardar" />
  </modal-component>
</template>

<script setup lang="ts">
import { clearHero } from "@/components/composables/clearCurrentHero";
import FormHeroes from "@/components/FormHeroes.vue";
import UiCard from "@/components/utils/Card/UiCard.vue";
import ModalComponent from "@/components/utils/ModalComponent.vue";
import UiBtn from "@/components/utils/UiBtn.vue";
import UiInput from "@/components/utils/UiInput.vue";
import store from "@/store";
import { computed, ref } from "vue";

const heroName = ref("");

const isHeroName = computed(() => !(heroName.value.length > 0));
const hero = computed(() => store.getters["heroes/getHero"]);

function searchByName() {
  clearHero(store);
  store.dispatch("heroes/fetchHeroByName", heroName.value);
}

function clearCurrentHero() {
  clearHero(store);
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

.card-by-hero {
  padding: 0 10rem;
}
</style>
