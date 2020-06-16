import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React, { useCallback } from 'react';
import { Order } from '../commons';
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

interface CardTableHeader {
  label: string;
  property: keyof Card;
  sortable: boolean;
  colWidth: 'small' | 'normal' | 'large';
}

const headers: CardTableHeader[] = [];

const addHeader = (
  label: string,
  property: keyof Card,
  sortable = true,
  colWidth: 'small' | 'normal' | 'large' = 'small'
) => {
  headers.push({
    label,
    property,
    sortable,
    colWidth
  });
};

addHeader('No.', 'number');
addHeader('Img', 'faceUrl', false);
addHeader('Name', 'name', true, 'normal');
addHeader('Rarity', 'rarity');
addHeader('Property', 'property');
addHeader('Cost', 'cost');
addHeader('Military', 'military');
addHeader('Job', 'job');
addHeader('Atk', 'finalAtk');
addHeader('Def', 'finalDef');
addHeader('Spd', 'finalSpd');
addHeader('Vir', 'finalVir');
addHeader('Stg', 'finalStg');

interface CardTableProps {
  cards: Card[];
  sort: keyof Card;
  order: Order;
  changeSort: (sort: keyof Card) => void;
}

const CardTable = ({ cards, sort, order, changeSort }: CardTableProps) => {
  const classes = useStyles();

  const onTableHeaderClick = useCallback(
    (property: keyof Card) => () => {
      changeSort(property);
    },
    [changeSort]
  );

  return (
    <TableContainer>
      <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="card table">
        <TableHead className={classes.header}>
          <TableRow>
            {headers.map(({ label, property, sortable, colWidth }) => (
              <TableCell
                key={property}
                className={colWidth === 'small' ? classes.smallCell : ''}
                sortDirection={sort === property ? order : false}
              >
                {sortable ? (
                  <TableSortLabel
                    active={sort === property}
                    direction={sort === property ? order : 'asc'}
                    onClick={onTableHeaderClick(property)}
                  >
                    {label}
                  </TableSortLabel>
                ) : (
                  label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map(card => (
            <TableRow hover key={card.id}>
              <TableCell>{card.number}</TableCell>
              <TableCell>
                <Avatar src={card.faceUrl} variant="square" className={classes.faceImg} />
              </TableCell>
              <TableCell>{card.name}</TableCell>
              <TableCell>
                {card.rarity}
                {utils.getStar(card.star)}
              </TableCell>
              <TableCell>{card.property}</TableCell>
              <TableCell>{card.cost}</TableCell>
              <TableCell>{card.military}</TableCell>
              <TableCell>{card.job}</TableCell>
              <TableCell>{card.finalAtk}</TableCell>
              <TableCell>{card.finalDef}</TableCell>
              <TableCell>{card.finalSpd}</TableCell>
              <TableCell>{card.finalVir}</TableCell>
              <TableCell>{card.finalStg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardTable;
