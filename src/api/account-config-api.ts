import { AccountConfig, ListAndCount } from '../helpers';

export const getAccountConfigs = (
  page: number,
  size: number,
  sort: string,
  order: 'ASC' | 'DESC',
  filters: Partial<AccountConfig>
): Promise<ListAndCount<AccountConfig>> => {
  return fetch(
    `${ROOT_API}/api/accounts/configs?page=${page}&size=${size}&sort=${sort}&order=${order.toUpperCase()}&filters=${JSON.stringify(
      filters,
      (key: string, value: string) => {
        if (value) {
          return value;
        }
      }
    )}`
  ).then(response => response.json());
};

export const patchAccountConfig = async (login: string, data: Partial<AccountConfig>): Promise<AccountConfig> => {
  return fetch(`${ROOT_API}/api/accounts/configs/${login}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(response => response.json());
};
