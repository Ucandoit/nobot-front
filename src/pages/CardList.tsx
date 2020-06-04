import { makeStyles, Paper, TablePagination } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { CardTable, CardTableToolbar } from '../card';
import { useAsyncFunction } from '../helpers';
import { Card } from '../helpers/types';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%'
  }
}));

type Order = 'ASC' | 'DESC';
type ListAndCount = [Card[], number];

const getCards = (page: number, size: number, sort: string, order: 'ASC' | 'DESC'): Promise<ListAndCount> => {
  return fetch(`${ROOT_API}/api/cards?page=${page}&size=${size}&sort=${sort}&order=${order}`).then(response =>
    response.json()
  );
};

const initialValue: ListAndCount = [[], 0];

// const rarityList = ['煌', '極', '稀', '珍', '並', '宝', '誉'];

const CardList: React.FC = () => {
  const classes = useStyles();

  // const location = useLocation<{ page: number; rarity: string }>();
  const [page, setPage] = useState(0);
  const [size, setSize] = React.useState(10);
  const [sort, setSort] = React.useState<keyof Card>('number');
  const [order, setOrder] = React.useState<Order>('ASC');

  const [[cards, count]] = useAsyncFunction<ListAndCount>(getCards, initialValue, page, size, sort, order);

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

  return (
    <>
      <Paper className={classes.paper}>
        <CardTableToolbar />
        <CardTable cards={cards} />
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
