import React, { ChangeEvent, useCallback, useState } from 'react';
import request from 'superagent';
import { ReserveCards } from '../../../card';
import { CardInfo } from '../../../helpers/types';
import Card from '../../card/Card';
import AccountSelector from './AccountSelector';
import SellForm from './SellForm';

const Sell = () => {
  const [selectedLogin, setSelectedLogin] = useState<string>('');
  const [reserveCards, setReserveCards] = useState<CardInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [card, setCard] = useState<CardInfo | undefined>();
  const [sellPrice, setSellPrice] = useState<number>(50000);

  React.useEffect(() => {
    if (selectedLogin) {
      getReserveCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLogin]);

  const getReserveCards = async () => {
    setLoading(true);
    const response = await request.get(`${ROOT_API}/api/accounts/${selectedLogin}/reserveCards`);
    setReserveCards(response.body);
    setLoading(false);
  };

  const handleCardClick = (id: string) => {
    setCard(reserveCards.find(c => c.id === id));
  };

  const handleNpChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(parseInt(event.target.value));
  };

  const sell = async () => {
    await request.post(`${ROOT_API}/api/cards/${card!.id}/sell?login=${selectedLogin}&sellPrice=${sellPrice}`).send();
    getReserveCards();
  };

  const changeAccount = useCallback((login: string) => {
    setSelectedLogin(login);
  }, []);

  return (
    <>
      <AccountSelector selected={selectedLogin} changeAccount={changeAccount} />
      <SellForm />
      <ReserveCards account={selectedLogin} />
      <div>
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
                  <input type="text" value={sellPrice} onChange={handleNpChange} />
                  <button onClick={sell}>Sell</button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default Sell;
