import { Module } from "vuex";
import { getHeroes } from "../../services/getHeroes";
import { Heroes } from "../../types/hero";

export const heroes: Module<Heroes, unknown> = {
  namespaced: true,
  state: {
    data: [
      {
        comics: { available: 0, collectionURI: "", items: [], returned: 0 },
        description: "",
        events: { available: 0, collectionURI: "", items: [], returned: 0 },
        id: 0,
        modified: "",
        name: "",
        resourceURI: "",
        series: { available: 0, collectionURI: "", items: [], returned: 0 },
        stories: { available: 0, collectionURI: "", items: [], returned: 0 },
        thumbnail: { available: 0, collectionURI: "", items: [], returned: 0 },
        urls: [],
      },
    ],
  },
  getters: {
    getHeroes(state) {
      return state;
    },
  },
  mutations: {
    setHeroes(state, payload: Heroes) {
      state.data = { ...state.data, ...payload };
    },
  },
  actions: {
    async fetchHeroes({ commit }) {
      const {
        data: { results },
      } = await getHeroes();
      commit("setHeroes", results);
    },
  },
};
