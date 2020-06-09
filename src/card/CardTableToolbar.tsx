import { Button, makeStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { CardFilters } from '../helpers';
import FilterField from './FilterField';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const rarities = ['煌', '極', '稀', '珍', '並', '宝', '誉'];
const stars = [0, 1, 2];
const properties = ['火', '地', '風', '水', '空'];
const costs = [1.0, 1.5, 2.0, 2.5, 3.0, 4.0];
const militaries = ['騎馬', '足軽', '鉄砲'];
const jobs = ['武士', '軍師', '僧侶', '忍者', '剣豪', '傾奇', '姫', '茶人', '商人', '水軍'];

interface CardTableToolbarProps {
  filters: CardFilters;
  changeFilter: (property: keyof CardFilters, value: string) => void;
  resetFilter: () => void;
}

const CardTableToolbar = ({
  filters: { rarity, star, property, cost, military, job },
  changeFilter,
  resetFilter
}: CardTableToolbarProps) => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.root}>
      <FilterField property="rarity" label="Rarity" items={rarities} value={rarity} changeFilter={changeFilter} />
      <FilterField property="star" label="Star" items={stars} value={star} changeFilter={changeFilter} />
      <FilterField
        property="property"
        label="Property"
        items={properties}
        value={property}
        changeFilter={changeFilter}
      />
      <FilterField property="cost" label="Cost" items={costs} value={cost} changeFilter={changeFilter} />
      <FilterField
        property="military"
        label="Military"
        items={militaries}
        value={military}
        changeFilter={changeFilter}
      />
      <FilterField property="job" label="Job" items={jobs} value={job} changeFilter={changeFilter} />
      <Button variant="contained" color="secondary" onClick={resetFilter}>
        Reset
      </Button>
    </Toolbar>
  );
};

export default CardTableToolbar;
