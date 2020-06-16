import { makeStyles, Paper, TablePagination } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { getCards } from '../api';
import { CardTable, CardTableToolbar } from '../card';
import { usePagination, useSort } from '../commons';
import { Card, CardFilters, CardListAndCount, useAsyncFunction } from '../helpers';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%'
  }
}));

const initialValue: CardListAndCount = [[], 0];

const CardList: React.FC = () => {
  const classes = useStyles();

  const [filters, setFilters] = useState<CardFilters>({});

  const { page, size, changePage, changeRowsPerPage } = usePagination();
  const { sort, order, changeSort } = useSort<Card>('number');

  const [[cards, count]] = useAsyncFunction<CardListAndCount>(getCards, initialValue, page, size, sort, order, filters);

  const handleChangeFilter = useCallback(
    (property: keyof CardFilters, value: string) => {
      setFilters({
        ...filters,
        [property]: value
      });
    },
    [filters]
  );

  const handleResetFilter = useCallback(() => {
    setFilters({});
  }, []);

  return (
    <>
      <Paper className={classes.paper}>
        <CardTableToolbar filters={filters} changeFilter={handleChangeFilter} resetFilter={handleResetFilter} />
        <CardTable cards={cards} sort={sort} order={order} changeSort={changeSort} />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={size}
          page={page}
          onChangePage={changePage}
          onChangeRowsPerPage={changeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default CardList;
