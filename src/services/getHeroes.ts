import axios from "axios";
import { getHash } from "./composables/getHash";

const PRIVATE_KEY = process.env.VUE_APP_PRIVATE_KEY;
const PUBLIC_KEY = process.env.VUE_APP_PUBLIC_KEY;
const BASE_URL = process.env.VUE_APP_BASE_URL;
let offSet = 0;

export const getHeroes = async () => {
  offSet += 6;
  const timeStamp = new Date().getTime();
  const hash = getHash(timeStamp, PRIVATE_KEY, PUBLIC_KEY);
  const url = `${BASE_URL}/v1/public/characters?offset=${offSet}&limit=${6}&ts=${timeStamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;

  const { data } = await axios.get(url);
  return data;
};

export const getHeroByName = async (name: string) => {
  const timeStamp = new Date().getTime();
  const hash = getHash(timeStamp, PRIVATE_KEY, PUBLIC_KEY);
  const url = `${BASE_URL}/v1/public/characters?name=${name}&ts=${timeStamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;

  const { data } = await axios.get(url);
  return data;
};
