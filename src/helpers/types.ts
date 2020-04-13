export interface CardInfo {
  id: string;
  name: string;
  realName: string;
  rarity: string;
  property: string;
  military: Military;
  tradable: boolean;
  inAction: boolean;
  trading: boolean;
  protect: boolean;
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
  constructing: boolean;
  running: boolean;
}

export interface Military {
  title: string;
}

export interface Account {
  login: string;
  name: string;
  cookie: string;
  expirationDate: string;
  startHour: number;
  dailySearch: number;
  enabled: boolean;
  np?: number;
}

export interface WarConfig {
  login: string;
  group: string;
  enabled: boolean;
  line: number;
  fp: boolean;
  npc: boolean;
  pc: boolean;
  auto?: boolean;
  status?: string;
}

export interface Card {
  id: number;
  number: number;
  name: string;
  realName: string;
  rarity: string;
  star: number;
  property: string;
  cost: number;
  military: string;
  job: string;
  faceUrl: string;
}
