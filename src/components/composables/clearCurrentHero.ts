import { Store } from "vuex";

export const clearHero = (store: Store<unknown>) => {
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
};
