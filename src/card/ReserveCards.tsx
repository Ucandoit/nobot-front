import { Grid } from '@material-ui/core';
import React, { useCallback } from 'react';
import { CardInfo } from '../helpers';

interface ReserveCardsProps {
  account: string;
}

const getReserveCards = (login: string): Promise<CardInfo[]> => {
  return fetch(`${ROOT_API}/api/accounts/${login}/reserveCards`).then(response => response.json());
};

// define outside of the component to avoid triggering rerender
const empty: CardInfo[] = [];

const ReserveCards = ({ account }: ReserveCardsProps) => {
  const getReserveCardsCallback = useCallback(() => {
    if (account) {
      return getReserveCards(account);
    } else {
      return Promise.resolve([]);
    }
  }, [account]);
  // const [cards, isPending, error] = useAsyncFunction<CardInfo[]>(
  //   getReserveCardsCallback,
  //   empty
  // );
  return <Grid container justify="center"></Grid>;
};

export default ReserveCards;
