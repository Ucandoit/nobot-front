import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import * as request from 'superagent';
import { Account } from '../../helpers/types';

const Accounts: React.FC = props => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/accounts?size=200&sort=login,asc`).then(res => {
      setAccounts(res.body._embedded.accounts);
    });
  }, []);
  return (
    <div>
      <h1>Accounts</h1>
      <Link to="/account/create">Create</Link>
      <br />
      <Link to="/account/mobile/create">Create mobile</Link>
      {accounts.map((account: Account, index: number) => (
        <div key={index}>
          <span style={{ marginRight: '10px' }}>{account.login}</span>
          <span style={{ marginRight: '10px' }}>{account.name}</span>
          <span style={{ marginRight: '10px' }}>{account.np}</span>
          <span style={{ marginRight: '10px' }}>{moment(account.expirationDate).format('DD-MM-YYYY')}</span>
          <span style={{ marginRight: '10px' }}>
            <Link to={`/account/edit/${account.login}`}>Edit</Link>
          </span>
          <span>
            <Link to={`/accounts/${account.login}`}>Detail</Link>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Accounts;
