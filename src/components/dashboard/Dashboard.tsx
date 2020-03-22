import React from 'react';
import request from 'superagent';
import { AccountInfo } from '../../helpers/types';
import Account from '../accounts/Account';

const DashBoard: React.FC = props => {
  const [accounts, setAccounts] = React.useState<AccountInfo[]>([]);
  const [selectedLogin, setSelectedLogin] = React.useState<string>('');

  React.useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const response = await request.get(`${ROOT_API}/api/rest/accounts/search/findAllWithCookieNotExpired`);
    setAccounts(response.body._embedded.accounts);
  };

  // const startWrestling = (login: string) => {
  //   request.get(`${ROOT_API}/api/rest/wrestle/startWrestling?login=${login}`).then(res => {
  //     console.log(res.body);
  //   });
  // };

  // const stopWrestling = (login: string) => {
  //   request.get(`${ROOT_API}/api/rest/wrestle/stopWrestling?login=${login}`).then(res => {
  //     console.log(res.body);
  //   });
  // };

  // const trade = (login: string) => {
  //   request.get(`${ROOT_API}/api/rest/account/trade/${login}`).then(res => {
  //     console.log(res.body);
  //   });
  // };

  return (
    <div className="dashboard">
      <div className="left-panel">
        <div className="account-list">
          {accounts.map(account => (
            <div
              className={`account-card ${selectedLogin === account.login ? 'selected' : ''}`}
              key={account.login}
              onClick={() => setSelectedLogin(account.login)}
            >
              {account.login} - {account.np}
            </div>
          ))}
        </div>
      </div>
      <div className="right-panel">{selectedLogin ? <Account login={selectedLogin} /> : null}</div>
    </div>
  );
};

export default DashBoard;
