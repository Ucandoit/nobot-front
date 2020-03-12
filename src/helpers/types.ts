export interface CardInfo {
  id: string;
  name: string;
  rarity: string;
  tradable: boolean;
  imgUrl: string;
  refineTotal: string;
  refineAtk: string;
  refineDef: string;
  refineSpd: string;
  refineVir: string;
  refineStg: string;
  skill1: string;
  skill2: string;
  skill3: string;
}

export interface AccountInfo {
  login: string;
  name: string;
  np: number;
  food: number;
  maxFood: number;
  fire: number;
  earth: number;
  wind: number;
  water: number;
  sky: number;
  maxFire: number;
  maxEarth: number;
  maxWind: number;
  maxWater: number;
  maxSky: number;
  newUser: boolean;
  areas: MapArea[];
  deckCards: CardInfo[];
  reserveCards: CardInfo[];
}

export interface MapArea {
  mapId: string;
  buildingType: string;
  title: string;
  level: number;
  x: number;
  y: number;
}
