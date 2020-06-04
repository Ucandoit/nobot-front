import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React from 'react';
import { Card, utils } from '../helpers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  header: {
    backgroundColor: '#c5cae9'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  smallCell: {
    maxWidth: '4rem'
  },
  faceImg: {
    height: '2rem',
    width: '2rem'
  }
}));

interface CardTableProps {
  cards: Card[];
}

const CardTable = ({ cards }: CardTableProps) => {
  const classes = useStyles();
  // const [order, setOrder] = React.useState<Order>('asc');
  // const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  // const [selected, setSelected] = React.useState<string[]>([]);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Card) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected: string[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }

  //   setSelected(newSelected);
  // };

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer>
      <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="card table">
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell
              align="left"
              className={classes.smallCell}
              // sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
              >
                No.
                {/* {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null} */}
              </TableSortLabel>
            </TableCell>
            <TableCell align="left" className={classes.smallCell}>
              Img
            </TableCell>
            <TableCell align="left">
              <TableSortLabel>Name</TableSortLabel>
            </TableCell>
            <TableCell align="left" className={classes.smallCell}>
              <TableSortLabel>Rarity</TableSortLabel>
            </TableCell>
            <TableCell align="left" className={classes.smallCell}>
              <TableSortLabel>Property</TableSortLabel>
            </TableCell>
            <TableCell align="left" className={classes.smallCell}>
              <TableSortLabel>Cost</TableSortLabel>
            </TableCell>
            <TableCell align="left" className={classes.smallCell}>
              <TableSortLabel>Military</TableSortLabel>
            </TableCell>
            <TableCell align="left" className={classes.smallCell}>
              <TableSortLabel>Job</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map(card => (
            <TableRow hover key={card.id}>
              <TableCell align="left">{card.number}</TableCell>
              <TableCell align="left">
                <Avatar src={card.faceUrl} variant="square" className={classes.faceImg} />
              </TableCell>
              <TableCell align="left">{card.name}</TableCell>
              <TableCell align="left">
                {card.rarity}
                {utils.getStar(card.star)}
              </TableCell>
              <TableCell align="left">{card.property}</TableCell>
              <TableCell align="left">{card.cost}</TableCell>
              <TableCell align="left">{card.military}</TableCell>
              <TableCell align="left">{card.job}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardTable;
