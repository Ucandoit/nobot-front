import { LinearProgress, makeStyles } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountSelector } from '../account';
import { SellForm } from '../auction';
import { ReserveCards } from '../card';
import { CardInfo, useAsyncFunction } from '../helpers';

const useStyles = makeStyles({
  progress: {
    width: '100%'
  }
});

const getReserveCards = (login: string): Promise<CardInfo[]> => {
  if (login) {
    return fetch(`${ROOT_API}/api/accounts/${login}/reserveCards`).then(response => response.json());
  }
  return Promise.resolve([]);
};

const getCard = (id: string, login: string): Promise<CardInfo | null> => {
  if (id && login) {
    return fetch(`${ROOT_API}/api/cards/${id}?login=${login}`).then(response => response.json());
  }
  return Promise.resolve(null);
};

// define outside of the component to avoid triggering rerender
const emptyArray: CardInfo[] = [];

const Sell = () => {
  const classes = useStyles();

  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<string>('');

  const [cards, loadingReserveCards, , reloadReserveCards] = useAsyncFunction<CardInfo[]>(
    getReserveCards,
    emptyArray,
    selectedAccount
  );

  const [card, loadingCard] = useAsyncFunction<CardInfo | null>(getCard, null, selectedCard, selectedAccount);

  const changeAccount = useCallback((login: string) => {
    setSelectedAccount(login);
  }, []);

  const selectCard = useCallback((id: string) => {
    setSelectedCard(id);
  }, []);

  const handleAfterSell = () => {
    setSelectedCard('');
    reloadReserveCards();
  };

  return (
    <>
      <Link to="/auction/sell/status">Status</Link>
      <AccountSelector />
      {loadingReserveCards ? (
        <LinearProgress className={classes.progress} />
      ) : (
        <ReserveCards cards={cards} selectCard={selectCard} />
      )}
      {selectedCard ? (
        <SellForm card={card} isPending={loadingCard} login={selectedAccount} afterSell={handleAfterSell} />
      ) : null}
    </>
  );
};

export default Sell;
