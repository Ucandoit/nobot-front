import React from 'react';
import { useParams } from 'react-router';
import * as request from 'superagent';
import { AccountInfo } from '../../helpers/types';
import Card from '../card/Card';

const Account: React.FC = props => {
  const { login } = useParams();
  const [accountInfo, setAccountInfo] = React.useState<AccountInfo | null>(null);

  const getAccountInfo = async () => {
    const response = await request.get(`${ROOT_API}/api/rest/account/info/${login}`);
    setAccountInfo(response.body);
  };

  React.useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <table>
            <tbody>
              {[0, 1, 2, 3, 4].map(y => {
                const row = accountInfo.areas
                  .filter(area => area.y === y)
                  .map(area => <td key={area.x}>{`${area.title} Lv.${area.level} `}</td>);
                return <tr key={y}>{row}</tr>;
              })}
            </tbody>
          </table>
          <div className="deck-group">
            {accountInfo.deckCards.map(card => (
              <Card key={card.id} name={card.name} imgUrl={card.imgUrl} tradable={card.tradable} />
            ))}
          </div>
          <div className="reserve-group">
            {accountInfo.reserveCards.map(card => (
              <Card key={card.id} name={card.name} imgUrl={card.imgUrl} tradable={card.tradable} />
            ))}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Account;
