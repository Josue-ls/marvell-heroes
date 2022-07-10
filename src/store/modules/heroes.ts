import { Module } from "vuex";
import { getHeroByName, getHeroes } from "../../services/getHeroes";
import { Heroes } from "../../types/hero";

export const heroes: Module<Heroes, unknown> = {
  namespaced: true,
  state: {
    data: [],
    currentHero: {
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
    },
  },
  getters: {
    getHeroes(state) {
      return state.data;
    },
    getHero(state) {
      return state.currentHero;
    },
  },
  mutations: {
    setHeroes(state, payload) {
      Object.assign(state.data, [...state.data, ...payload]);
    },
    setHero(state, payload) {
      state.currentHero = payload;
    },
    setHeroById(state, payload) {
      const heroList = [...state.data];
      const index = heroList.map((hero) => hero.id).indexOf(payload.id);
      heroList.splice(index, 1, payload);
      state.data = heroList;
    },
    setNewHero(state, payload) {
      Object.assign(state.data, [...[payload], ...state.data]);
    },
  },
  actions: {
    async fetchHeroes({ commit }) {
      const res = await getHeroes();
      commit("setHeroes", res.data.results);
    },
    async fetchHeroByName({ commit }, name: string) {
      const res = await getHeroByName(name);
      commit("setHero", res.data.results[0]);
    },
  },
};
