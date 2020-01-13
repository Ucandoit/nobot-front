import React from 'react';
import * as request from 'superagent';
import WarStatus from './WarStatus';

const WarList: React.FC = props => {
  const [accounts, setAccounts] = React.useState([]);
  const [endDate, setEndDate] = React.useState('');
  React.useEffect(() => {
    loadList();
  }, []);

  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/parameters/war.lastDay`).then(res => {
      setEndDate(res.body.value);
    });
  }, []);

  const loadList = () => {
    request.get(`${ROOT_API}/api/rest/war/warConfigList`).then(res => {
      setAccounts(res.body);
    });
  };

  const toUnicode = (value: boolean) => {
    return value ? '\u2705' : '\u274C';
  };

  const checkWar = () => {
    request.get(`${ROOT_API}/api/rest/war/checkWar`).then(() => loadList());
  };

  const startAll = () => {
    request.get(`${ROOT_API}/api/rest/war/startAll`).then(() => loadList());
  };

  const stopAll = () => {
    request.get(`${ROOT_API}/api/rest/war/stopAll`).then(() => loadList());
  };

  const startWar = (login: string, line: number, fp: boolean, npc: boolean) => {
    request.get(`${ROOT_API}/api/rest/war/start/${login}/${line}?fp=${fp}&npc=${npc}`).then(() => loadList());
  };

  const stopWar = (login: string) => {
    request.get(`${ROOT_API}/api/rest/war/stop/${login}`).then(() => loadList());
  };

  const togglePC = (login: string, pc: boolean) => {
    request.get(`${ROOT_API}/api/rest/war/pc/${login}/${!pc}`).then(() => loadList());
  };

  const toggleLine = (login: string, line: number) => {
    const nextLine = line === 3 ? 1 : ++line;
    request.get(`${ROOT_API}/api/rest/war/line/${login}/${nextLine}`).then(() => loadList());
  };

  const toggleFP = (login: string, fp: boolean) => {
    request.get(`${ROOT_API}/api/rest/war/fp/${login}/${!fp}`).then(() => loadList());
  };

  const toggleNPC = (login: string, npc: boolean) => {
    request.get(`${ROOT_API}/api/rest/war/npc/${login}/${!npc}`).then(() => loadList());
  };

  const onEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const changeEndDate = () => {
    request
      .patch(`${ROOT_API}/api/rest/parameters/war.lastDay`)
      .set('Content-Type', 'application/json')
      .send({ value: endDate })
      .then(res => {});
  };

  return (
    <div className="warList">
      <h1>War</h1>
      <div>
        End date: <input type="text" value={endDate} onChange={onEndDateChange} />{' '}
        <button onClick={changeEndDate}>Change</button>
      </div>
      <button onClick={checkWar}>Check war status</button>
      <button onClick={startAll}>Start All</button>
      <button onClick={stopAll}>Stop All</button>
      <div className="row">
        <span>Login</span>
        <span>Line</span>
        <span>FP</span>
        <span>NPC</span>
        <span>Auto enabled</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      {accounts.map((account: any) => (
        <div className="row" key={account.login}>
          <span className="clickable" onClick={() => togglePC(account.login, account.pc)}>
            {account.pc ? <img className="pc" src={process.env.PUBLIC_URL + '/pc.png'} alt="" /> : ''}
            {account.login}
          </span>
          <span className="clickable" onClick={() => toggleLine(account.login, account.line)}>
            {account.line}
          </span>
          <span className="clickable" onClick={() => toggleFP(account.login, account.fp)}>
            {toUnicode(account.fp)}
          </span>
          <span className="clickable" onClick={() => toggleNPC(account.login, account.npc)}>
            {toUnicode(account.npc)}
          </span>
          <span>{toUnicode(account.enabled)}</span>
          <span>
            <WarStatus login={account.login} status={JSON.parse(account.status)} />
          </span>
          <span>
            {account.auto ? (
              <img
                className="action"
                src={process.env.PUBLIC_URL + '/stop.png'}
                alt=""
                onClick={() => stopWar(account.login)}
              />
            ) : (
              <img
                className="action"
                src={process.env.PUBLIC_URL + '/start.png'}
                alt=""
                onClick={() => startWar(account.login, account.line, account.fp, account.npc)}
              />
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WarList;
