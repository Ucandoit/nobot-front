import { Account } from '../helpers';

export const getLastMobileAccount = (): Promise<string> => {
  return fetch(`${ROOT_API}/api/accounts/lastMobile`).then(response => response.text());
};

export const saveMobileAccount = (account: Account): Promise<void> => {
  return fetch(`${ROOT_API}/api/accounts/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(account)
  }).then(response => response.json());
};
