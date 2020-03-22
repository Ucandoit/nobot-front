import React from 'react';
import * as request from 'superagent';
import { AccountInfo } from '../helpers/types';

export const useAccountInfo = (login: string) => {
  const [accountInfo, setAccountInfo] = React.useState<AccountInfo | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getAccountInfo = async () => {
    setLoading(true);
    const response = await request.get(`${ROOT_API}/api/rest/account/info/${login}`);
    setAccountInfo(response.body);
    setLoading(false);
  };

  React.useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return { loadingAccount: loading, accountInfo };
};
