import { Grid, LinearProgress, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { CardInfo, useAsyncFunction } from '../helpers';
import Card from './Card';

const useStyles = makeStyles(theme => ({
  progress: {
    width: '100%'
  }
}));

interface ReserveCardsProps {
  account: string;
}

const getReserveCards = (login: string): Promise<CardInfo[]> => {
  return fetch(`${ROOT_API}/api/accounts/${login}/reserveCards`).then(response => response.json());
};

// define outside of the component to avoid triggering rerender
const empty: CardInfo[] = [];

const ReserveCards = ({ account }: ReserveCardsProps) => {
  const classes = useStyles();
  const getReserveCardsCallback = useCallback(() => {
    if (account) {
      return getReserveCards(account);
    } else {
      return Promise.resolve([]);
    }
  }, [account]);
  const [cards, isPending] = useAsyncFunction<CardInfo[]>(getReserveCardsCallback, empty);
  return (
    <Grid container justify="flex-start">
      {isPending ? (
        <LinearProgress className={classes.progress} />
      ) : (
        <>
          {cards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </>
      )}
    </Grid>
  );
};

export default ReserveCards;
