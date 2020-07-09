import { Grid } from '@material-ui/core';
import React from 'react';
import { MapArea } from '../helpers';

interface BuildingsProps {
  areas: MapArea[];
}

const Buildings: React.FC<BuildingsProps> = ({ areas }) => {
  return (
    <Grid container justify="center" spacing={3}>
      {areas.map(
        area =>
          area.building && (
            <Grid item md={3} key={area.mapId}>
              {area.title.trim()} {area.level ? `Lv.${area.level}` : ''}
            </Grid>
          )
      )}
    </Grid>
  );
};

export default Buildings;
