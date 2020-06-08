import { CardFilters, CardListAndCount } from '../helpers';

export const getCards = (
  page: number,
  size: number,
  sort: string,
  order: 'ASC' | 'DESC',
  filters: CardFilters
): Promise<CardListAndCount> => {
  return fetch(
    `${ROOT_API}/api/cards?page=${page}&size=${size}&sort=${sort}&order=${order.toUpperCase()}&filters=${JSON.stringify(
      filters,
      (key: string, value: string) => {
        if (value) {
          return value;
        }
      }
    )}`
  ).then(response => response.json());
};
