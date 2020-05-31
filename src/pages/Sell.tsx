import { LinearProgress, makeStyles } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
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
  return fetch(`${ROOT_API}/api/accounts/${login}/reserveCards`).then(response => response.json());
};

const getCard = (id: string, login: string): Promise<CardInfo> => {
  return fetch(`${ROOT_API}/api/cards/${id}?login=${login}`).then(response => response.json());
};

// define outside of the component to avoid triggering rerender
const emptyArray: CardInfo[] = [];

const Sell = () => {
  const classes = useStyles();

  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<string>('');

  const getReserveCardsCallback = useCallback(() => {
    if (selectedAccount) {
      return getReserveCards(selectedAccount);
    } else {
      return Promise.resolve([]);
    }
  }, [selectedAccount]);

  const getCardCallback = useCallback(() => {
    if (selectedAccount && selectedCard) {
      return getCard(selectedCard, selectedAccount);
    } else {
      return Promise.resolve(null);
    }
  }, [selectedAccount, selectedCard]);

  const [cards, loadingReserveCards, , reloadReserveCards] = useAsyncFunction<CardInfo[]>(
    getReserveCardsCallback,
    emptyArray
  );

  const [card, loadingCard] = useAsyncFunction<CardInfo | null>(getCardCallback, null);

  const changeAccount = useCallback((login: string) => {
    setSelectedAccount(login);
  }, []);

  const selectCard = useCallback((id: string) => {
    setSelectedCard(id);
  }, []);

  return (
    <>
      <AccountSelector selectedAccount={selectedAccount} changeAccount={changeAccount} />
      {loadingReserveCards ? (
        <LinearProgress className={classes.progress} />
      ) : (
        <ReserveCards cards={cards} selectCard={selectCard} />
      )}
      {selectedCard ? (
        <SellForm card={card} isPending={loadingCard} login={selectedAccount} afterSell={reloadReserveCards} />
      ) : null}
    </>
  );
};

export default Sell;
