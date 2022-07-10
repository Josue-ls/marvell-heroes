import { Module } from "vuex";
import { getHeroes } from "../../services/getHeroes";
import { Heroes } from "../../types/hero";

export const heroes: Module<Heroes, unknown> = {
  namespaced: true,
  state: {
    data: [],
  },
  getters: {
    getHeroes(state) {
      return state.data;
    },
  },
  mutations: {
    setHeroes(state, payload) {
      Object.assign(state.data, [...state.data, ...payload]);
    },
  },
  actions: {
    async fetchHeroes({ commit }) {
      const res = await getHeroes();
      commit("setHeroes", res.data.results);
    },
    async fetchHero({ commit }) {
      const res = await getHeroes();
      commit("setHeroes", res.data.results);
    },
  },
};
