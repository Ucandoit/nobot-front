import { Grid } from '@material-ui/core';
import React from 'react';
import { CardInfo } from '../helpers';
import Card from './Card';

interface ReserveCardsProps {
  cards: CardInfo[];
  selectCard: (id: string) => void;
}

const ReserveCards = ({ cards, selectCard }: ReserveCardsProps) => (
  <Grid container justify="flex-start">
    {cards.map(card => (
      <Card key={card.id} card={card} selectCard={selectCard} />
    ))}
  </Grid>
);

export default ReserveCards;
