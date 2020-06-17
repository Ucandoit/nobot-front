import { ListAndCount, SellState } from '../helpers';

export const getSellStates = (
  page: number,
  size: number,
  sort: string,
  order: 'ASC' | 'DESC',
  filters: Partial<SellState>
): Promise<ListAndCount<SellState>> => {
  console.log(filters);
  return fetch(
    `${ROOT_API}/api/auction/sell/status?page=${page}&size=${size}&sort=${sort}&order=${order.toUpperCase()}&filters=${JSON.stringify(
      filters,
      (key: string, value: string) => {
        if (value) {
          return value;
        }
      }
    )}`
  ).then(response => response.json());
};
