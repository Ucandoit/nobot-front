import React, { useCallback, useState } from 'react';
import { AccountSelector } from '../account';
import { SellForm } from '../auction';
import { ReserveCards } from '../card';

const Sell = () => {
  const [selectedLogin, setSelectedLogin] = useState<string>('');
  // const [card, setCard] = useState<CardInfo | undefined>();
  // const [sellPrice, setSellPrice] = useState<number>(50000);

  // const handleNpChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSellPrice(parseInt(event.target.value));
  // };

  // const sell = async () => {
  //   await request.post(`${ROOT_API}/api/cards/${card!.id}/sell?login=${selectedLogin}&sellPrice=${sellPrice}`).send();
  //   getReserveCards();
  // };

  const changeAccount = useCallback((login: string) => {
    setSelectedLogin(login);
  }, []);

  return (
    <>
      <AccountSelector selected={selectedLogin} changeAccount={changeAccount} />
      <SellForm />
      <ReserveCards account={selectedLogin} />
      {/* <div>
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
      </div> */}
    </>
  );
};

export default Sell;
