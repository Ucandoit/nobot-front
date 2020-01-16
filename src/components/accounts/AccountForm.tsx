import React from 'react';
import * as request from 'superagent';
import { useHistory } from 'react-router-dom';

interface AccountFormProps {
  isCreate: boolean;
}

const AccountForm: React.FC<AccountFormProps> = ({ isCreate }) => {
  const history = useHistory();
  const [login, setLogin] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [cookieC, setCookieC] = React.useState<string>('');
  const [cookieU, setCookieU] = React.useState<string>('');
  const [expirationDate, setExpirationDate] = React.useState<string>('');

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onCookieCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCookieC(event.target.value);
  };

  const onCookieUChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCookieU(event.target.value);
  };

  const onExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(event.target.value);
  };

  const createAccount = () => {
    request
      .post(`${ROOT_API}/api/rest/accounts`)
      .set('Content-Type', 'application/json')
      .send({
        login,
        name,
        cookie: `C=${cookieC};U=${cookieU};`,
        expirationDate,
        startHour: 0,
        dailySearch: 0,
        enabled: false
      })
      .then(res => {
        history.push('/accounts');
      });
  };

  return (
    <div>
      <div>
        <label>Login: </label>
        <input value={login} onChange={onLoginChange} />
      </div>
      <div>
        <label>Name: </label>
        <input value={name} onChange={onNameChange} />
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
        <input value={expirationDate} onChange={onExpirationDateChange} />
      </div>
      <button onClick={createAccount}>Create</button>
    </div>
  );
};

export default AccountForm;
