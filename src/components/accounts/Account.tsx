import React from 'react';
import * as request from 'superagent';
import { Training } from '../../helpers/enums';
import { CardInfo } from '../../helpers/types';
import { useAccountInfo } from '../../hooks';
import Card from '../card/Card';

interface AccountProps {
  login: string;
}

const Account: React.FC<AccountProps> = ({ login }) => {
  const { loadingAccount, accountInfo } = useAccountInfo(login);
  const [cardInfo, setCardInfo] = React.useState<CardInfo | null>(null);
  const [loadingCard, setLoadingCard] = React.useState<boolean>(false);
  const [trainingType, setTrainingType] = React.useState<Training>(Training.FIRE);
  const [targetLevel, setTargetLevel] = React.useState<number>(20);

  React.useEffect(() => {
    setCardInfo(null);
  }, [login]);

  const handleCardClick = async (cardId: string) => {
    setLoadingCard(true);
    const response = await request.get(`${ROOT_API}/api/rest/card/${cardId}?login=${login}`);
    setCardInfo(response.body);
    setLoadingCard(false);
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
      `${ROOT_API}/api/rest/training/start/${login}?catId=${
        cardInfo.id
      }&training=${trainingType}&level=${level}&targetLevel=${once ? level + 1 : targetLevel}`
    );
  };

  const build = async () => {
    await request.get(`${ROOT_API}/api/rest/tutorial/build/${login}`);
  };

  return (
    <div className="account-detail">
      {loadingAccount ? (
        'Loading'
      ) : accountInfo ? (
        <React.Fragment>
          <button onClick={build}>Build</button>
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
          {loadingCard ? (
            'Loading'
          ) : cardInfo ? (
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
                <input type="text" value={targetLevel} onChange={e => setTargetLevel(parseInt(e.target.value))} />
                <button onClick={() => handleTraining(cardInfo)}>修練</button>
                <button onClick={() => handleTraining(cardInfo, true)}>修練一次</button>
              </div>
              <div>{cardInfo.skill1}</div>
              <div>{cardInfo.skill2}</div>
              <div>{cardInfo.skill3}</div>
            </div>
          ) : null}
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Account;
