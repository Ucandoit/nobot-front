import React from 'react';
import * as request from 'superagent';

const RecruitSystem: React.FC = props => {
  const [tutorial, setTutorial] = React.useState<string>('');
  const [target, setTarget] = React.useState<string>('');
  const [source, setSource] = React.useState<string>('');
  const [logins, setLogins] = React.useState<string[]>([]);
  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/accounts?size=100&sort=login`).then(res => {
      setLogins(res.body._embedded.accounts.map((account: any) => account.login));
    });
  }, []);

  const onTutorialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTutorial(event.target.value);
  };

  const onTargetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTarget(event.target.value);
  };

  const onSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
  };

  const attach = () => {
    request.get(`${ROOT_API}/api/rest/account/recruit/attach_code/${target}?source=${source}`).then(res => {
      claimInviterReward(target);
    });
  };

  const claimInviterReward = (login: string) => {
    request.get(`${ROOT_API}/api/rest/account/recruit/inviterReward/${login}`).then(res => {});
  };

  const startTutorial = () => {
    request.get(`${ROOT_API}/api/rest/tutorial/start/${tutorial}`).then(res => {});
  };

  return (
    <div>
      <h1>Recruit</h1>
      <div>
        <label>Tutorial: </label>
        <select value={tutorial} onChange={onTutorialChange}>
          <option value="">-</option>
          {logins.map(login => (
            <option key={login} value={login}>
              {login}
            </option>
          ))}
        </select>
      </div>
      <button onClick={startTutorial}>Start tutorial</button>
      <div>
        <label>Target: </label>
        <select value={target} onChange={onTargetChange}>
          <option value="">-</option>
          {logins.map(login => (
            <option key={login} value={login}>
              {login}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Source: </label>
        <select value={source} onChange={onSourceChange}>
          <option value="">-</option>
          {logins.map(login => (
            <option key={login} value={login}>
              {login}
            </option>
          ))}
        </select>
      </div>
      <button onClick={attach}>Attach</button>
    </div>
  );
};

export default RecruitSystem;
