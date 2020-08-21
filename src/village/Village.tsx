import { LinearProgress, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { getVillage } from '../api';
import { CardPool } from '../card';
import { useAsyncFunction } from '../helpers';
import accountContext from './accountContext';
import Buildings from './Buildings';
import Resources from './Resources';

const useStyles = makeStyles({
  progress: {
    width: '100%'
  }
});

const Village: React.FC = () => {
  const classes = useStyles();
  const { account } = useContext(accountContext);
  const [village, loading] = useAsyncFunction(getVillage, undefined, account);
  return (
    <>
      {loading ? (
        <LinearProgress className={classes.progress} />
      ) : village ? (
        <>
          <Resources resources={village.resourceInfo} />
          <Buildings areas={village.areas} />
          <CardPool cards={village.deckCards} />
          <CardPool cards={village.reserveCards} />
        </>
      ) : null}
    </>
  );
};

export default Village;
