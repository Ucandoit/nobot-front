import { Grid } from '@material-ui/core';
import React from 'react';
import { ResourceInfo } from '../helpers';

interface ResourcesProps {
  resources: ResourceInfo;
}

const Resources: React.FC<ResourcesProps> = ({ resources }) => {
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item md={'auto'} xs={3}>
        火: {resources.fire}/{resources.maxFire}
      </Grid>
      <Grid item md={'auto'} xs={3}>
        地: {resources.earth}/{resources.maxEarth}
      </Grid>
      <Grid item md={'auto'}>
        風: {resources.wind}/{resources.maxWind}
      </Grid>
      <Grid item md={'auto'}>
        水: {resources.water}/{resources.maxWater}
      </Grid>
      <Grid item md={'auto'}>
        空: {resources.sky}/{resources.maxSky}
      </Grid>
      <Grid item md={'auto'}>
        兵糧: {resources.food}/{resources.maxFood}
      </Grid>
      <Grid item md={'auto'}>
        Np: {resources.np}
      </Grid>
    </Grid>
  );
};

export default Resources;
