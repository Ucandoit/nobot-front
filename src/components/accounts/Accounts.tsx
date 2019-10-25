import React from 'react';
import * as request from 'superagent';
import { Link } from 'react-router-dom';

const Accounts: React.FC = props => {
  const [accounts, setAccounts] = React.useState([]);
  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/accounts?size=50`).then(res => {
      setAccounts(res.body._embedded.accounts);
    });
  }, []);

  return (
    <div>
      <h1>Auction History</h1>
      {accounts.map((account: any, index: number) => (
        <div key={index}>
          <span style={{ marginRight: '10px' }}>{account.login}</span>
          <span style={{ marginRight: '10px' }}>{account.name}</span>
          <span>
            <Link to={`/accounts/${account.login}`}>Config</Link>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Accounts;
