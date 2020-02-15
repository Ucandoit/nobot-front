import React from 'react';
import * as request from 'superagent';
import { Link } from 'react-router-dom';

const Accounts: React.FC = props => {
  const [accounts, setAccounts] = React.useState([]);
  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/accounts?size=50&sort=login,asc`).then(res => {
      setAccounts(res.body._embedded.accounts);
    });
  }, []);

  const getReserveCards = (login: string) => {
    request.get(`${ROOT_API}/api/rest/account/reserveCards/${login}`).then(res => {
      alert(JSON.stringify(res.body));
    });
  };

  return (
    <div>
      <h1>Auction History</h1>
      <Link to="/account/create">Create</Link>
      {accounts.map((account: any, index: number) => (
        <div key={index}>
          <span style={{ marginRight: '10px' }}>{account.login}</span>
          <span style={{ marginRight: '10px' }}>{account.name}</span>
          <span>
            <button onClick={() => getReserveCards(account.login)}>ReserveCards</button>
          </span>
          <span>
            <Link to={`/accounts/${account.login}`}>Config</Link>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Accounts;
