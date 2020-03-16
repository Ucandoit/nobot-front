import React from 'react';
import { useParams } from 'react-router';
import * as request from 'superagent';
import { Training } from '../../helpers/enums';
import { AccountInfo, CardInfo } from '../../helpers/types';
import Card from '../card/Card';

const Account: React.FC = props => {
  const { login } = useParams();
  const [accountInfo, setAccountInfo] = React.useState<AccountInfo | null>(null);
  const [cardInfo, setCardInfo] = React.useState<CardInfo | null>(null);
  const [trainingType, setTrainingType] = React.useState<Training>(Training.FIRE);

  const getAccountInfo = async () => {
    const response = await request.get(`${ROOT_API}/api/rest/account/info/${login}`);
    setAccountInfo(response.body);
  };

  React.useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = async (cardId: string) => {
    const response = await request.get(`${ROOT_API}/api/rest/card/${cardId}?login=${login}`);
    setCardInfo(response.body);
  };

  const handleTrainingTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTrainingType(event.target.value as Training);
  };

  const handleTraining = async (cardInfo: CardInfo, once = false) => {
    let level = 0;
    switch (trainingType) {
      case Training.FIRE:
        level = parseInt(cardInfo.refineAtk.replace('Lv', ''));
        break;
      case Training.EARTH:
        level = parseInt(cardInfo.refineDef.replace('Lv', ''));
        break;
      case Training.WIND:
        level = parseInt(cardInfo.refineSpd.replace('Lv', ''));
        break;
      case Training.WATER:
        level = parseInt(cardInfo.refineVir.replace('Lv', ''));
        break;
      case Training.SKY:
        level = parseInt(cardInfo.refineStg.replace('Lv', ''));
        break;
      default:
        break;
    }
    await request.get(
      `${ROOT_API}/api/rest/training/start/${login}?catId=${cardInfo.id}&training=${trainingType}&level=${level}&once=${once}`
    );
  };

  return (
    <div className="account-detail">
      {accountInfo ? (
        <React.Fragment>
          <div>
            <span>{`火: ${accountInfo.fire}/${accountInfo.maxFire} `}</span>
            <span>{`地: ${accountInfo.earth}/${accountInfo.maxEarth} `}</span>
            <span>{`風: ${accountInfo.wind}/${accountInfo.maxWind} `}</span>
            <span>{`水: ${accountInfo.water}/${accountInfo.maxWater} `}</span>
            <span>{`空: ${accountInfo.sky}/${accountInfo.maxSky} `}</span>
            <span>{`兵糧: ${accountInfo.food}/${accountInfo.maxFood} `}</span>
            <span>{`Np: ${accountInfo.np}`}</span>
          </div>
          <table className="map">
            <tbody>
              {[0, 1, 2, 3, 4].map(y => {
                const row = accountInfo.areas
                  .filter(area => area.y === y)
                  .map(area => (
                    <td
                      key={area.x}
                      className={`${area.constructing ? 'constructing' : ''} ${area.running ? 'running' : ''}`}
                    >{`${area.title} Lv.${area.level} `}</td>
                  ));
                return <tr key={y}>{row}</tr>;
              })}
            </tbody>
          </table>
          <div className="deck-group">
            {accountInfo.deckCards.map(card => (
              <Card key={card.id} card={card} handleCardClick={handleCardClick} />
            ))}
          </div>
          <div className="reserve-group">
            {accountInfo.reserveCards.map(card => (
              <Card key={card.id} card={card} handleCardClick={handleCardClick} />
            ))}
          </div>
          {cardInfo ? (
            <div>
              <div>{cardInfo.name}</div>
              <div>
                {cardInfo.refineTotal} {cardInfo.refineAtk} {cardInfo.refineDef} {cardInfo.refineSpd}{' '}
                {cardInfo.refineVir} {cardInfo.refineStg}
              </div>
              <div>
                <select value={trainingType} onChange={handleTrainingTypeChange}>
                  {Object.values(Training).map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleTraining(cardInfo)}>修練</button>
                <button onClick={() => handleTraining(cardInfo, true)}>修練一次</button>
              </div>
            </div>
          ) : null}
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Account;
