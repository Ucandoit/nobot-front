import React from 'react';
import * as request from 'superagent';
import { WAR_HOST_LIST } from '../../helpers/constants';

interface WarStatusProps {
  login: string;
  status: any;
}

const WarStatus: React.FC<WarStatusProps> = ({ login, status }) => {
  const [warField, setWarField] = React.useState(status && status.warFields.length > 0 ? status.warFields[0] : '');
  const [warHost, setWarHost] = React.useState<string>(status && status.warHosts.length > 0 ? status.warHosts[0] : '');

  const handleWarFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWarField(event.target.value);
  };

  const handleWarHostChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWarHost(event.target.value);
  };

  const goToWarField = () => {
    request
      .post(`${ROOT_API}/api/rest/war/field`)
      .send(`login=${login}&warField=${warField}`)
      .then(res => {});
  };

  const chooseWarHost = () => {
    request
      .post(`${ROOT_API}/api/rest/war/host`)
      .send(`login=${login}&warHost=${WAR_HOST_LIST[warHost]}`)
      .then(res => {});
  };

  if (status && status.warField) {
    if (status.warHost) {
      return <React.Fragment>{`${status.warField} ${status.warHost}`}</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <select value={warHost} onChange={handleWarHostChange}>
            {status &&
              status.warHosts.map((host: string) => (
                <option key={host} value={host}>
                  {host}
                </option>
              ))}
          </select>
          <button onClick={chooseWarHost}>Go</button>
        </React.Fragment>
      );
    }
  }
  return (
    <React.Fragment>
      <select value={warField} onChange={handleWarFieldChange}>
        {status &&
          status.warFields.map((field: string) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
      </select>
      <button onClick={goToWarField}>Go</button>
    </React.Fragment>
  );
};

export default WarStatus;
