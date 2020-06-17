import { Avatar } from '@material-ui/core';
import React from 'react';
import { getSellStates } from '../api';
import { ColumnBuilder, FilterField, Table, TableColumn, useTable } from '../commons/table';
import { SellState, utils } from '../helpers';

const columns: TableColumn<SellState>[] = new ColumnBuilder<SellState>()
  .addColumn('Img', result => {
    const accountCard = result.accountCard || result.archivedData;
    if (accountCard) {
      return <Avatar src={accountCard.card.faceUrl} variant="square" />;
    } else {
      return '';
    }
  })
  .addColumn('Name', (result: SellState) => {
    const accountCard = result.accountCard || result.archivedData;
    if (accountCard) {
      const {
        card: { rarity, star, name }
      } = accountCard;
      return `${rarity} ${utils.getStar(star)} ${name}`;
    }
    return result.id.toString();
  })
  .addColumn('Status', 'status')
  .addColumn('Price', 'price')
  .addColumn('Login', (result: SellState) => {
    const accountCard = result.accountCard || result.archivedData;
    if (accountCard) {
      return accountCard.login;
    }
    return result.id.toString();
  })
  .addColumn('Post date', 'postDate')
  .getColumns();

const filterFields: FilterField<SellState>[] = [
  {
    property: 'status',
    label: 'Status',
    type: 'select',
    items: ['SELLING', 'SOLD']
  }
];
const SellStateList = () => {
  const tableOptions = useTable<SellState>(
    columns,
    { sort: 'postDate', order: 'desc', filters: { status: 'SELLING' } },
    filterFields,
    getSellStates
  );
  return <Table {...tableOptions} />;
};

export default SellStateList;
