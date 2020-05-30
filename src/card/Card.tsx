import { Card as MuiCard, CardContent, makeStyles } from '@material-ui/core';
import React from 'react';
import { CardInfo } from '../helpers';
import actionImg from '../img/action.png';
import protectImg from '../img/protect.png';
import tradingImg from '../img/trading.png';
import untradableImg from '../img/untradable.png';

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
  card: CardInfo;
  selectCard: (id: string) => void;
}

const Card = ({ card: { id, faceUrl, trading, inAction, untradable, protect, name }, selectCard }: CardProps) => {
  const classes = useStyles();
  return (
    <MuiCard className={classes.card} onClick={() => selectCard(id)}>
      <CardContent className={classes.cardContent}>
        <div className={classes.imgWrapper}>
          <img src={faceUrl} alt={name} title={name} />
          {trading ? (
            <img src={tradingImg} className={classes.trading} alt="trading" />
          ) : inAction ? (
            <img src={actionImg} className={classes.trading} alt="action" />
          ) : null}
        </div>
        <div>
          {untradable ? <img src={untradableImg} alt="" /> : null}
          {protect ? <img src={protectImg} alt="" /> : null}
        </div>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
