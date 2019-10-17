import React from 'react';
import request from 'superagent';

const DashBoard: React.FC = props => {
  const [accounts, setAccounts] = React.useState<any>([]);
  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/account/info`).then(res => {
      setAccounts(res.body);
    });
  }, []);

  const startWrestling = (login: string) => {
    request.get(`${ROOT_API}/api/rest/wrestle/startWrestling?login=${login}`).then(res => {
      console.log(res.body);
    });
  };

  const stopWrestling = (login: string) => {
    request.get(`${ROOT_API}/api/rest/wrestle/stopWrestling?login=${login}`).then(res => {
      console.log(res.body);
    });
  };

  const trade = (login: string) => {
    request.get(`${ROOT_API}/api/rest/account/trade/${login}`).then(res => {
      console.log(res.body);
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Login</th>
          <th>Name</th>
          <th>NP</th>
          <th>Food</th>
          <th>Elements</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account: any) => {
          return (
            <tr key={account.login}>
              <td>{account.login}</td>
              <td>{account.name}</td>
              <td>{account.np}</td>
              <td>{account.food}</td>
              <td>{`${account.fire}/${account.maxFire} ${account.earth}/${account.maxEarth} ${account.wind}/${account.maxWind} ${account.water}/${account.maxWater} ${account.sky}/${account.maxSky}`}</td>
              <td>
                <button onClick={() => startWrestling(account.login)}>Start</button>
                <button onClick={() => stopWrestling(account.login)}>Stop</button>
                <button onClick={() => trade(account.login)}>Trade</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DashBoard;
