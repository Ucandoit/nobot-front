import { Card as MuiCard, CardContent, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { CardFace } from '../helpers';
import actionImg from '../img/action.png';
import tradingImg from '../img/trading.png';

const useStyles = makeStyles(theme => ({
  card: {
    width: '6rem',
    margin: theme.spacing(1),
    textAlign: 'center',
    cursor: 'pointer'
  },
  cardContent: {
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: 'unset'
    }
  },
  imgWrapper: {
    position: 'relative'
  },
  trading: {
    position: 'absolute',
    left: '0',
    right: '0',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

interface CardProps {
  card: CardFace;
  selectCard?: (id: number) => void;
}

const Card = ({ card: { id, faceUrl, trading, action }, selectCard }: CardProps) => {
  const classes = useStyles();
  const onCardClick = useCallback(() => {
    if (selectCard) {
      selectCard(id);
    }
  }, [id, selectCard]);
  return (
    <MuiCard className={classes.card} onClick={onCardClick}>
      <CardContent className={classes.cardContent}>
        <div className={classes.imgWrapper}>
          <img src={faceUrl} alt={`Card img ${id}`} />
          {trading ? (
            <img src={tradingImg} className={classes.trading} alt="trading" />
          ) : action ? (
            <img src={actionImg} className={classes.trading} alt="action" />
          ) : null}
        </div>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
