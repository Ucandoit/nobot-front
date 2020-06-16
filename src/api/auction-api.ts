import { SellState } from '../helpers';

export const getSellStates = (
  page: number,
  size: number,
  sort: string,
  order: 'ASC' | 'DESC'
): Promise<SellState[]> => {
  console.log(page, size, sort, order);
  return fetch(
    `${ROOT_API}/api/auction/sell/status?page=${page}&size=${size}&sort=${sort}&order=${order.toUpperCase()}`
  ).then(response => response.json());
};
