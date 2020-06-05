import { makeStyles, Paper, TablePagination } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { CardTable, CardTableToolbar } from '../card';
import { Card, CardFilters, Order, useAsyncFunction } from '../helpers';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%'
  }
}));

type ListAndCount = [Card[], number];

const getCards = (
  page: number,
  size: number,
  sort: string,
  order: 'ASC' | 'DESC',
  filters: CardFilters
): Promise<ListAndCount> => {
  return fetch(
    `${ROOT_API}/api/cards?page=${page}&size=${size}&sort=${sort}&order=${order.toUpperCase()}&filters=${JSON.stringify(
      filters,
      (key: string, value: string) => {
        if (value) {
          return value;
        }
      }
    )}`
  ).then(response => response.json());
};

const initialValue: ListAndCount = [[], 0];

const CardList: React.FC = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState<keyof Card>('number');
  const [order, setOrder] = useState<Order>('asc');
  const [filters, setFilters] = useState<CardFilters>({});
  console.log(filters);
  const [[cards, count]] = useAsyncFunction<ListAndCount>(getCards, initialValue, page, size, sort, order, filters);

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSortChange = useCallback(
    (property: keyof Card) => {
      const isAsc = sort === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setSort(property);
    },
    [order, sort]
  );

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
        <CardTable cards={cards} sort={sort} order={order} changeSort={handleSortChange} />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={size}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default CardList;
