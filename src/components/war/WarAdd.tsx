import React from 'react';
import { useHistory } from 'react-router-dom';
import * as request from 'superagent';
import { WarGroup } from '../../helpers/enums';
import { WarConfig } from '../../helpers/types';

const WarAdd: React.FC = props => {
  const history = useHistory();

  const [warConfig, setWarConfig] = React.useState<WarConfig>({
    login: '',
    group: '',
    line: 1,
    enabled: true,
    fp: false,
    npc: true,
    pc: false
  });

  const onFieldChange = (field: string, value: string | boolean | number) => {
    setWarConfig({
      ...warConfig,
      [field]: value
    });
  };

  const createWarConfig = async () => {
    await request
      .post(`${ROOT_API}/api/rest/warConfigs`)
      .set('Content-Type', 'application/json')
      .send(warConfig);
    history.push('/war');
  };

  return (
    <div>
      <div>
        <label>Login: </label>
        <input value={warConfig.login} onChange={event => onFieldChange('login', event.target.value)} />
      </div>
      <div>
        <label>Group: </label>
        <select value={warConfig.group} onChange={event => onFieldChange('group', event.target.value)}>
          <option value="">ALL</option>
          {Object.keys(WarGroup).map(group => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Line: </label>
        <select value={warConfig.line} onChange={event => onFieldChange('line', event.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <label>Enabled: </label>
        <input
          type="checkbox"
          checked={warConfig.enabled}
          onChange={event => onFieldChange('enabled', event.target.value)}
        />
      </div>
      <div>
        <label>FP: </label>
        <input type="checkbox" checked={warConfig.fp} onChange={event => onFieldChange('fp', event.target.value)} />
      </div>
      <div>
        <label>PC: </label>
        <input type="checkbox" checked={warConfig.pc} onChange={event => onFieldChange('pc', event.target.value)} />
      </div>
      <div>
        <label>NPC: </label>
        <input type="checkbox" checked={warConfig.npc} onChange={event => onFieldChange('npc', event.target.value)} />
      </div>
      <button onClick={createWarConfig}>Create</button>
    </div>
  );
};

export default WarAdd;
