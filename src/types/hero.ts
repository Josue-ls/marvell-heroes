export interface Heroes {
  data: Array<Hero>;
  currentHero?: Hero;
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
  thumbnail: Image;
  urls: Array<unknown>;
}

interface CommonObject {
  available: number;
  collectionURI: string;
  items: Array<unknown>;
  returned: number;
}

interface Image {
  path: string;
  extension: string;
}
