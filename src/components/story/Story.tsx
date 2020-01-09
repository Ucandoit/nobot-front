import React from 'react';
import request from 'superagent';

const Story: React.FC = props => {
  const [accounts, setAccounts] = React.useState<any>([]);
  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/accounts?size=50&sort=login,asc`).then(res => {
      setAccounts(res.body._embedded.accounts);
    });
  }, []);

  const start = (login: string) => {
    request.get(`${ROOT_API}/api/rest/story/start/${login}`).then(res => {
      console.log(res.body);
    });
  };

  const stop = (login: string) => {
    request.get(`${ROOT_API}/api/rest/story/stop/${login}`).then(res => {
      console.log(res.body);
    });
  };
  const startAll = () => {
    request.get(`${ROOT_API}/api/rest/story/startAll`).then(res => {
      console.log(res.body);
    });
  };

  const stopAll = () => {
    request.get(`${ROOT_API}/api/rest/story/stopAll`).then(res => {
      console.log(res.body);
    });
  };

  const trade = (login: string) => {
    request.get(`${ROOT_API}/api/rest/account/trade/${login}`).then(res => {
      console.log(res.body);
    });
  };

  return (
    <React.Fragment>
      <h1>War</h1>
      <button onClick={startAll}>Start All</button>
      <button onClick={stopAll}>Stop All</button>

      <table>
        <thead>
          <tr>
            <th>Login</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account: any) => {
            return (
              <tr key={account.login}>
                <td>{account.login}</td>
                <td>{account.name}</td>
                <td>
                  <button onClick={() => start(account.login)}>Start</button>
                  <button onClick={() => stop(account.login)}>Stop</button>
                  <button onClick={() => trade(account.login)}>Trade</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Story;
