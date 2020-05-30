import React, { useCallback, useState } from 'react';
import { AccountSelector } from '../account';
import { SellForm } from '../auction';
import { ReserveCards } from '../card';
import { CardInfo, useAsyncFunction } from '../helpers';

const getCard = (id: string, login: string): Promise<CardInfo> => {
  return fetch(`${ROOT_API}/api/cards/${id}?login=${login}`).then(response => response.json());
};

const Sell = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<string>('');

  const getCardCallback = useCallback(() => {
    if (selectedAccount && selectedCard) {
      return getCard(selectedCard, selectedAccount);
    } else {
      return Promise.resolve(null);
    }
  }, [selectedAccount, selectedCard]);

  const [card, isPending] = useAsyncFunction<CardInfo | null>(getCardCallback, null);

  const changeAccount = useCallback((login: string) => {
    setSelectedAccount(login);
  }, []);

  const selectCard = useCallback((id: string) => {
    setSelectedCard(id);
  }, []);

  return (
    <>
      <AccountSelector selectedAccount={selectedAccount} changeAccount={changeAccount} />
      <ReserveCards account={selectedAccount} selectCard={selectCard} />
      {selectedCard ? <SellForm card={card} isPending={isPending} login={selectedAccount} /> : null}
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
