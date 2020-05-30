import { Button, Card, CardContent, CircularProgress, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { CardInfo, utils } from '../helpers';

const useStyles = makeStyles({
  root: {
    height: '10rem'
  }
});

interface SellFormProps {
  card: CardInfo | null;
  isPending: boolean;
  login: string;
}

const SellForm = ({ card, isPending, login }: SellFormProps) => {
  const classes = useStyles();
  const [sellPrice, setSellPrice] = useState<number>(50000);

  const handleSellPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(parseInt(event.target.value));
  };

  const sell = async () => {
    await fetch(`${ROOT_API}/api/cards/${card!.id}/sell?login=${login}&sellPrice=${sellPrice}`, { method: 'POST' });
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Card>
        <CardContent>
          {isPending || !card ? (
            <CircularProgress />
          ) : (
            <div>
              <div>{card.name}</div>
              <div>
                {card.property} {card.rarity} {utils.getStar(card.star)}
              </div>
              <div>{card.deed}</div>
              <div>{card.refineTotal}</div>
              <div>
                {card.refineAtk} {card.refineDef} {card.refineSpd} {card.refineVir} {card.refineStg}
              </div>
              <div>{card.skill1}</div>
              <div>{card.skill2}</div>
              <div>{card.skill3}</div>
              <div>
                <TextField variant="outlined" value={sellPrice} onChange={handleSellPriceChange} />
                <Button variant="contained" color="primary" onClick={sell}>
                  Sell
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SellForm;
