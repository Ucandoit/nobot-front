import { VillageInfo } from '../helpers';

export const getVillage = (login: string): Promise<VillageInfo | undefined> => {
  if (login) {
    return fetch(`${ROOT_API}/api/action/village/${login}`).then(response => response.json());
  } else {
    return Promise.resolve(undefined);
  }
};

export const toggleFavorite = async (login: string, cardId: number, favorite: boolean): Promise<void> => {
  await fetch(`${ROOT_API}/api/action/card/toggleFavorite?login=${login}&cardId=${cardId}&favorite=${favorite}`);
};
