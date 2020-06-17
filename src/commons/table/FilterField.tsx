import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import { FilterType } from './types';

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

interface FilterFieldProps<T> {
  property: keyof T;
  label: string;
  type: FilterType;
  items?: Array<string | { key: string; value: string }>;
  value: string | undefined;
  changeFilter: (property: keyof T, value: string) => void;
}
const FilterField = <T,>({ property, label, type, items, value, changeFilter }: FilterFieldProps<T>) => {
  const classes = useStyles();
  const onChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => changeFilter(property as keyof T, event.target.value as string),
    [property, changeFilter]
  );
  return (
    <FormControl variant="outlined" margin="dense" className={classes.filterField}>
      <InputLabel id={`${property}-label`}>{label}</InputLabel>
      {type === 'select' ? (
        <Select labelId={`${property}-label`} label={label} value={value || ''} onChange={onChange}>
          <MenuItem value="">-</MenuItem>
          {items &&
            items.map((item: string | { key: string; value: string }) => (
              <MenuItem
                key={typeof item === 'object' ? item.key : item}
                value={typeof item === 'object' ? item.value : item}
              >
                {item}
              </MenuItem>
            ))}
        </Select>
      ) : null}
    </FormControl>
  );
};

export default FilterField;
