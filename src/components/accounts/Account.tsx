import React from 'react';
import { useParams } from 'react-router';
import * as request from 'superagent';
import { CardInfo } from '../../helpers/types';

const Account: React.FC = props => {
  const { login } = useParams();

  const [reserveCards, setReserveCards] = React.useState<CardInfo[]>([]);

  React.useEffect(() => {
    const getReserveCards = async () => {
      const res = await request.get(`${ROOT_API}/api/rest/account/reserveCards/${login}`);
      setReserveCards(res.body);
    };
    getReserveCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="account-detail">
      {reserveCards.map(card => (
        <div key={card.id}>
          <img src={card.imgUrl} alt="" />
          {card.name}
          {card.tradable ? null : <img src={process.env.PUBLIC_URL + '/lock.png'} alt="" />}
        </div>
      ))}
    </div>
  );
};

export default Account;
