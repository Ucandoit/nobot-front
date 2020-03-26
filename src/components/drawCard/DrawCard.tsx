import React from 'react';
import * as request from 'superagent';

const DrawCard: React.FC = props => {
  const [drawStatusList, setDrawStatusList] = React.useState([]);
  React.useEffect(() => {
    loadDrawStatusList();
  }, []);

  const loadDrawStatusList = () => {
    request.get(`${ROOT_API}/api/rest/drawStatuses?size=200&sort=login`).then(res => {
      setDrawStatusList(res.body._embedded.drawStatuses);
    });
  };

  const updateStatus = () => {
    request.get(`${ROOT_API}/api/rest/account/draw/update_status`).then(res => {
      loadDrawStatusList();
    });
  };

  const drawCard = (login: string, type: number) => {
    request.get(`${ROOT_API}/api/rest/account/draw/${login}/${type}`).then(res => {});
  };

  return (
    <div className="drawCardList">
      <h1>Draw Card</h1>
      <button onClick={updateStatus}>Update Status</button>
      {drawStatusList.map((drawStatus: any) => (
        <div className="row" key={drawStatus.login}>
          <span>{drawStatus.login}</span>
          <span>
            {drawStatus.fuNumber} <button onClick={() => drawCard(drawStatus.login, 5)}>Fu</button>
          </span>
          <span>
            {drawStatus.jiNumber} <button onClick={() => drawCard(drawStatus.login, 4)}>Ji</button>
          </span>
          <span>
            {drawStatus.fukubikiNumber} <button onClick={() => drawCard(drawStatus.login, 0)}>Fukubiki</button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default DrawCard;
