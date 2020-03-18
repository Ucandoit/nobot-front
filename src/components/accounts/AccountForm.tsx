import React from 'react';
import * as request from 'superagent';
import { useHistory, useParams } from 'react-router-dom';
import { Account } from '../../helpers/types';

interface AccountFormProps {
  isCreate: boolean;
}

const AccountForm: React.FC<AccountFormProps> = ({ isCreate }) => {
  const { login } = useParams();
  const history = useHistory();

  const [account, setAccount] = React.useState<Account>({
    login: '',
    name: '',
    cookie: '',
    expirationDate: '',
    startHour: 0,
    dailySearch: 0,
    enabled: false
  });

  let cookieC = '';
  let cookieU = '';
  const groups = account.cookie.match(/C=(.*);U=(.*);/);
  if (groups && groups.length > 2) {
    cookieC = groups[1];
    cookieU = groups[2];
  }

  const getAccount = async () => {
    const res = await request.get(`${ROOT_API}/api/rest/accounts/${login}`);
    setAccount(res.body);
  };

  React.useEffect(() => {
    if (!isCreate) {
      getAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      login: event.target.value
    });
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      name: event.target.value
    });
  };

  const onCookieCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      cookie: `C=${event.target.value};U=${cookieU};`
    });
  };

  const onCookieUChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      cookie: `C=${cookieC};U=${event.target.value};`
    });
  };

  const onExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      expirationDate: event.target.value
    });
  };

  const createOrUpdateAccount = async () => {
    if (isCreate) {
      await request
        .post(`${ROOT_API}/api/rest/accounts`)
        .set('Content-Type', 'application/json')
        .send(account);
    } else {
      await request
        .put(`${ROOT_API}/api/rest/accounts/${login}`)
        .set('Content-Type', 'application/json')
        .send(account);
    }
    history.push('/accounts');
  };

  return (
    <div>
      <div>
        <label>Login: </label>
        <input value={account.login} onChange={onLoginChange} />
      </div>
      <div>
        <label>Name: </label>
        <input value={account.name} onChange={onNameChange} />
      </div>
      <div>
        <label>Cookie C: </label>
        <input value={cookieC} onChange={onCookieCChange} />
      </div>
      <div>
        <label>Cookie U: </label>
        <input value={cookieU} onChange={onCookieUChange} />
      </div>
      <div>
        <label>Expiration date: </label>
        <input value={account.expirationDate} onChange={onExpirationDateChange} />
      </div>
      <button onClick={createOrUpdateAccount}>{isCreate ? 'Create' : 'Modify'}</button>
    </div>
  );
};

export default AccountForm;
