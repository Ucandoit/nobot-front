import { Grid, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { MapArea } from '../helpers';

const useStyles = makeStyles({
  constructing: {
    border: '1px solid blue'
  },
  training: {
    border: '1px solid red'
  }
});

interface BuildingsProps {
  areas: MapArea[];
}

const Buildings: React.FC<BuildingsProps> = ({ areas }) => {
  const classes = useStyles();
  return (
    <Grid container justify="center" spacing={3}>
      {areas.map(
        area =>
          area.building && (
            <Grid
              item
              md={3}
              className={classNames({
                [classes.constructing]: area.constructing,
                [classes.training]: area.running
              })}
              key={area.mapId}
            >
              {area.title.trim()} {area.level ? `Lv.${area.level}` : ''}
            </Grid>
          )
      )}
    </Grid>
  );
};

export default Buildings;
