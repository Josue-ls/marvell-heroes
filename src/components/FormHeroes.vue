<template>
  <div class="row">
    <div class="col-6" :key="state.id">
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
        :text="props.action"
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
import moment from "moment";
import { computed, defineProps, reactive, watch } from "vue";
import UiBtn from "./utils/UiBtn.vue";
import UiInput from "./utils/UiInput.vue";
import UiTextArea from "./utils/UiTextArea.vue";
import { clearHero } from "./composables/clearCurrentHero";

const props = defineProps<{
  action: string;
}>();

const hero = computed(() => store.getters["heroes/getHero"]);
const heroes = computed(() => store.getters["heroes/getHeroes"]);

const state = reactive({
  id: 0,
  name: "",
  description: "",
  thumbnail: {},
  img: "",
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
      const size = extension.length;
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

function clearForm() {
  Object.keys(state).forEach((key: string) => {
    if (typeof state[key] === "string") state[key] = "";
    if (typeof state[key] === "number") state[key] = 0;
    if (typeof state[key] === "object") state[key] = {};
  });
  state.id += 1;
}

function Guardar() {
  state.id = heroes.value.length + 1;
  store.commit("heroes/setNewHero", {
    ...hero.value,
    ...state,
    ...{ modified: moment().format("YYYY-MM-DD[T]HH:mm:ss[-0600]") },
  });
}

function Editar() {
  verifyFields();
  store.commit("heroes/setHeroById", { ...hero.value, ...state });
  clearHero(store);
}

function updateHero() {
  props.action === "Guardar" && Guardar();
  props.action === "Editar" && Editar();
  clearForm();
}
</script>

<style lang="scss" scoped>
.img-size {
  width: 100%;
}
</style>
