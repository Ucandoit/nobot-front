import React, { useState, ChangeEvent } from 'react';
import { AccountInfo, CardInfo } from '../../../helpers/types';
import request from 'superagent';
import moment from 'moment';
import Card from '../../card/Card';

const Sell = () => {
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [selectedLogin, setSelectedLogin] = useState<string>('');
  const [reserveCards, setReserveCards] = useState<CardInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [card, setCard] = useState<CardInfo | undefined>();
  const [sellNp, setSellNp] = useState<number>(50000);

  React.useEffect(() => {
    getAccounts();
  }, []);

  React.useEffect(() => {
    if (selectedLogin) {
      getReserveCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLogin]);

  const getAccounts = async () => {
    const response = await request.get(`${ROOT_API}/api/accounts`);
    setAccounts(response.body);
  };

  const getReserveCards = async () => {
    setLoading(true);
    const response = await request.get(`${ROOT_API}/api/accounts/${selectedLogin}/reserveCards`);
    setReserveCards(response.body);
    setLoading(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLogin(event.target.value);
    setReserveCards([]);
  };

  const handleCardClick = (id: string) => {
    setCard(reserveCards.find(c => c.id === id));
  };

  const handleNpChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSellNp(parseInt(event.target.value));
  };

  const sell = () => {};

  const now = moment.now();

  return (
    <div>
      <select value={selectedLogin} onChange={handleOnChange}>
        <option value=""> - </option>
        {accounts.map(account => (
          <option key={account.login} value={account.login} disabled={moment(account.expirationDate).isBefore(now)}>
            {account.login}
          </option>
        ))}
      </select>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="reserve-group">
            {reserveCards.map(card => (
              <Card key={card.id} card={card} handleCardClick={handleCardClick} />
            ))}
          </div>
          {card ? (
            <div className="sell">
              <div>{card.name}</div>
              <div>
                <label>np</label>
                <input type="text" value={sellNp} onChange={handleNpChange} />
                <button onClick={sell}>Sell</button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Sell;
