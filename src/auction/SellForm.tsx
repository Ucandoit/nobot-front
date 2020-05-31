import { Button, Card, CardContent, CircularProgress, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { CardInfo, utils } from '../helpers';

const useStyles = makeStyles(theme => ({
  textInput: {
    height: '2rem',
    width: '6rem',
    marginRight: theme.spacing(2)
  },
  button: {
    height: '2rem'
  }
}));

interface SellFormProps {
  card: CardInfo | null;
  isPending: boolean;
  login: string;
  afterSell?: () => void;
}

const SellForm = ({ card, isPending, login, afterSell }: SellFormProps) => {
  const classes = useStyles();
  const [sellPrice, setSellPrice] = useState<number>(50000);

  const handleSellPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(parseInt(event.target.value));
  };

  const sell = async () => {
    try {
      await fetch(`${ROOT_API}/api/cards/${card!.id}/sell?login=${login}&sellPrice=${sellPrice}`, { method: 'POST' });
      if (afterSell) {
        afterSell();
      }
    } catch (err) {
      // TODO error handling
    }
  };

  return (
    <Grid container justify="center">
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
                <TextField
                  variant="outlined"
                  size="small"
                  value={sellPrice}
                  onChange={handleSellPriceChange}
                  InputProps={{
                    className: classes.textInput
                  }}
                />
                <Button variant="contained" color="primary" className={classes.button} onClick={sell}>
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
