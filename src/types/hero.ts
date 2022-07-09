export interface Heroes {
  data: Array<Hero>;
}

export interface Hero {
  comics: CommonObject;
  description: string;
  events: CommonObject;
  id: number;
  modified: string;
  name: string;
  resourceURI: string;
  series: CommonObject;
  stories: CommonObject;
  thumbnail: unknown;
  urls: Array<unknown>;
}

interface CommonObject {
  available: number;
  collectionURI: string;
  items: Array<unknown>;
  returned: number;
}
