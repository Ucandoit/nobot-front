import React from 'react';
import * as request from 'superagent';
import WarStatus from './WarStatus';
import { WarConfig } from '../../helpers/types';
import { WarGroup } from '../../helpers/enums';
import { Link } from 'react-router-dom';

const groups = Object.keys(WarGroup);

const WarList: React.FC = props => {
  const [accounts, setAccounts] = React.useState<WarConfig[]>([]);
  const [endDate, setEndDate] = React.useState('');
  const [group, setGroup] = React.useState<string>('');
  const [groupLine, setGroupLine] = React.useState<number>(1);
  const [groupFP, setGroupFP] = React.useState<boolean>(false);
  const [groupNPC, setGroupNPC] = React.useState<boolean>(false);
  const [groupEnabled, setGroupEnabled] = React.useState<boolean>(false);

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

  const toggleGroup = async (login: string, group: string) => {
    const index = groups.indexOf(group);
    const nextGroup = index < groups.length - 1 ? groups[index + 1] : groups[0];
    await request
      .patch(`${ROOT_API}/api/rest/warConfigs/${login}`)
      .set('Content-Type', 'application/json')
      .send({ group: nextGroup });
    loadList();
  };

  const togglePC = async (login: string, pc: boolean) => {
    await request.get(`${ROOT_API}/api/rest/war/pc/${login}/${!pc}`);
    loadList();
  };

  const toggleLine = async (login: string, line: number) => {
    const nextLine = line === 3 ? 1 : ++line;
    await request
      .patch(`${ROOT_API}/api/rest/warConfigs/${login}`)
      .set('Content-Type', 'application/json')
      .send({ line: nextLine });
    loadList();
  };

  const toggleLineByGroup = async () => {
    if (group !== '') {
      await request.get(`${ROOT_API}/api/rest/war/line/${group}/${groupLine}`);
      loadList();
    }
  };

  const toggleFP = async (login: string, fp: boolean) => {
    await request
      .patch(`${ROOT_API}/api/rest/warConfigs/${login}`)
      .set('Content-Type', 'application/json')
      .send({ fp: !fp });
    loadList();
  };

  const toggleFPByGroup = async () => {
    if (group !== '') {
      await request.get(`${ROOT_API}/api/rest/war/fp/${group}/${groupFP}`);
      loadList();
    }
  };

  const toggleNPC = async (login: string, npc: boolean) => {
    await request
      .patch(`${ROOT_API}/api/rest/warConfigs/${login}`)
      .set('Content-Type', 'application/json')
      .send({ npc: !npc });
    loadList();
  };

  const toggleNPCByGroup = async () => {
    if (group !== '') {
      await request.get(`${ROOT_API}/api/rest/war/npc/${group}/${groupNPC}`);
      loadList();
    }
  };

  const toggleEnabled = async (login: string, enabled: boolean) => {
    await request
      .patch(`${ROOT_API}/api/rest/warConfigs/${login}`)
      .set('Content-Type', 'application/json')
      .send({ enabled: !enabled });
    loadList();
  };

  const toggleEnabledByGroup = async () => {
    if (group !== '') {
      await request.get(`${ROOT_API}/api/rest/war/enabled/${group}/${groupEnabled}`);
      loadList();
    }
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

  const goToWarFieldForGroup = async (warField: string) => {
    await request.post(`${ROOT_API}/api/rest/war/field`).send(`group=${group}&warField=${warField}`);
  };

  const chooseWarHostForGroup = async (warHost: number) => {
    await request.post(`${ROOT_API}/api/rest/war/host`).send(`group=${group}&warHost=${warHost}`);
  };

  return (
    <div className="warList">
      <h1>War</h1>
      <Link to="/war/create">
        <button>Create</button>
      </Link>
      <div>
        End date: <input type="text" value={endDate} onChange={onEndDateChange} />{' '}
        <button onClick={changeEndDate}>Change</button>
      </div>
      <div>
        Group:{' '}
        <select value={group} onChange={e => setGroup(e.target.value)}>
          <option value="">ALL</option>
          {groups.map(g => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <div>
        Line:{' '}
        <select value={groupLine} onChange={e => setGroupLine(parseInt(e.target.value))}>
          {[1, 2, 3].map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <button onClick={toggleLineByGroup}>Change line</button>
      </div>
      <div>
        FP:
        <input type="checkbox" checked={groupFP} onChange={() => setGroupFP(!groupFP)} />
        <button onClick={toggleFPByGroup}>Change FP</button>
      </div>
      <div>
        NPC:
        <input type="checkbox" checked={groupNPC} onChange={() => setGroupNPC(!groupNPC)} />
        <button onClick={toggleNPCByGroup}>Change NPC</button>
      </div>
      <div>
        Enabled:
        <input type="checkbox" checked={groupEnabled} onChange={() => setGroupEnabled(!groupEnabled)} />
        <button onClick={toggleEnabledByGroup}>Change Enabled</button>
      </div>
      <button onClick={checkWar}>Check war status</button>
      <button onClick={startAll}>Start All</button>
      <button onClick={stopAll}>Stop All</button>
      <div className="row">
        <span>Login</span>
        <span>Group</span>
        <span className="short">Line</span>
        <span className="short">FP</span>
        <span className="short">NPC</span>
        <span className="short">Auto enabled</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      {accounts.map(account => (
        <div className="row" key={account.login}>
          <span className="clickable" onClick={() => togglePC(account.login, account.pc)}>
            {account.pc ? <img className="pc" src={process.env.PUBLIC_URL + '/pc.png'} alt="" /> : ''}
            {account.login}
          </span>
          <span className="clickable" onClick={() => toggleGroup(account.login, account.group)}>
            {account.group || 'N/A'}
          </span>
          <span className="clickable short" onClick={() => toggleLine(account.login, account.line)}>
            {account.line}
          </span>
          <span className="clickable short" onClick={() => toggleFP(account.login, account.fp)}>
            {toUnicode(account.fp)}
          </span>
          <span className="clickable short" onClick={() => toggleNPC(account.login, account.npc)}>
            {toUnicode(account.npc)}
          </span>
          <span className="clickable short" onClick={() => toggleEnabled(account.login, account.enabled)}>
            {toUnicode(account.enabled)}
          </span>
          <span>
            <WarStatus
              login={account.login}
              status={account.status ? JSON.parse(account.status) : null}
              goToWarFieldForGroup={goToWarFieldForGroup}
              chooseWarHostForGroup={chooseWarHostForGroup}
            />
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
