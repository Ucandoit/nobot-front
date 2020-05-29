import { Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    height: '10rem'
  }
});

const SellForm = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.root}>
      <Card>
        <CardContent>dddd</CardContent>
      </Card>
    </Grid>
  );
};

export default SellForm;
