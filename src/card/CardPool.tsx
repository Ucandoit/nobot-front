import { Grid } from '@material-ui/core';
import React from 'react';
import { CardFace } from '../helpers';
import CardV2 from './CardV2';

interface CardPoolProps {
  cards: CardFace[];
}

const CardPool = ({ cards }: CardPoolProps) => {
  return (
    <Grid container justify="center">
      {cards.map(card => (
        <CardV2 key={card.id} card={card} />
      ))}
    </Grid>
  );
};

export default CardPool;
