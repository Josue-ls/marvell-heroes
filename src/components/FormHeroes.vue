<template>
  <div class="row">
    <div class="col-6">
      <ui-input
        css-class="mb-4"
        v-model="state.name"
        :placeholder="hero.name"
        :key="state.id"
      />
      <ui-text-area
        css-class="mb-4"
        v-model="state.description"
        :placeholder="hero.description"
        :key="state.id"
      />
      <ui-input
        css-class="mb-4"
        v-model="state.img"
        :placeholder="state.img"
        :key="state.id"
      />

      <ui-btn
        @click="updateHero"
        text="Editar"
        css-class="btn-outline-primary"
        data-bs-dismiss="modal"
      />
    </div>

    <div class="col-6">
      <img class="img-size" :src="state.img" :key="state.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { computed, reactive, watch } from "vue";
import UiBtn from "./utils/UiBtn.vue";
import UiInput from "./utils/UiInput.vue";
import UiTextArea from "./utils/UiTextArea.vue";

const hero = computed(() => store.getters["heroes/getHero"]);

const state = reactive({
  id: 0,
  name: "",
  description: "",
  thumbnail: {},
  img: "",
  selectedFile: null,
});

watch(hero, () => {
  state.id = hero.value.id;
  state.name = hero.value.name;
  state.description = hero.value.description;
  state.thumbnail = hero.value.thumbnail;
  state.img = `${hero.value.thumbnail.path}.${hero.value.thumbnail.extension}`;
});

watch(
  () => state.img,
  () => {
    if (state.img.length > 0) {
      const extension = state.img.trim().split(".");
      console.log(extension);
      const size = extension.length;
      console.log(state.img.trim());
      console.log(
        state.img
          .trim()
          .substring(0, state.img.length - extension[size - 1].length - 1)
      );
      console.log(extension[size - 1]);
      state.thumbnail = {
        path: state.img
          .trim()
          .substring(0, state.img.length - extension[size - 1].length - 1),
        extension: extension[size - 1],
      };
    }
  }
);

function verifyFields() {
  if (state.name === "") {
    state.name = hero.value.name;
  }
  if (state.description === "") {
    state.description = hero.value.description;
  }
  if (state.thumbnail === {}) {
    state.thumbnail = hero.value.thumbnail;
  }
}

function updateHero() {
  verifyFields();
  store.commit("heroes/setHeroById", { ...hero.value, ...state });
  store.commit("heroes/setHero", {
    comics: {
      available: 0,
      collectionURI: "",
      items: [],
      returned: 0,
    },
    description: "",
    events: { available: 0, collectionURI: "", items: [], returned: 0 },
    id: 0,
    modified: "",
    name: "",
    resourceURI: "",
    series: { available: 0, collectionURI: "", items: [], returned: 0 },
    stories: { available: 0, collectionURI: "", items: [], returned: 0 },
    thumbnail: {
      path: "",
      extension: "",
    },
    urls: [],
  });
}
</script>

<style lang="scss" scoped>
.img-size {
  width: 100%;
}
</style>
