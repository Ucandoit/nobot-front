import React from 'react';
import * as request from 'superagent';
import { Link } from 'react-router-dom';

const Accounts: React.FC = props => {
  const [accounts, setAccounts] = React.useState([]);
  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/accounts?size=200&sort=login,asc`).then(res => {
      setAccounts(res.body._embedded.accounts);
    });
  }, []);

  return (
    <div>
      <h1>Auction History</h1>
      <Link to="/account/create">Create</Link>
      {accounts.map((account: any, index: number) => (
        <div key={index}>
          <span style={{ marginRight: '10px' }}>{account.login}</span>
          <span style={{ marginRight: '10px' }}>{account.name}</span>
          <span style={{ marginRight: '10px' }}>{account.np}</span>
          <span>
            <Link to={`/accounts/${account.login}`}>Detail</Link>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Accounts;
