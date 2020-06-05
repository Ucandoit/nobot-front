import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import { Card, CardFilters } from '../helpers';

const useStyles = makeStyles(theme => ({
  filterField: {
    margin: theme.spacing(1),
    minWidth: '10rem'
  },
  select: {
    paddingTop: '1rem',
    paddingBottom: '1rem'
  }
}));

interface FilterFieldProps {
  property: keyof Card;
  label: string;
  items: (string | number)[];
  value: string | number | undefined;
  changeFilter: (property: keyof CardFilters, value: string) => void;
}

const FilterField = ({ property, label, items, value, changeFilter }: FilterFieldProps) => {
  const classes = useStyles();
  const onChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) =>
      changeFilter(property as keyof CardFilters, event.target.value as string),
    [property, changeFilter]
  );
  return (
    <FormControl variant="outlined" margin="dense" className={classes.filterField}>
      <InputLabel id={`${property}-label`}>{label}</InputLabel>
      <Select labelId={`${property}-label`} label={label} value={value || ''} onChange={onChange}>
        <MenuItem value="">-</MenuItem>
        {items.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterField;
