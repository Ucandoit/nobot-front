import React from 'react';
import { getSellStates } from '../api';
import { ColumnBuilder, Table, TableColumn, useTable } from '../commons/table';
import { SellState } from '../helpers';

const columns: TableColumn<SellState>[] = new ColumnBuilder<SellState>()
  .addHeader('Name', 'accountCard.card.name', false)
  .addHeader('Status', 'status')
  .addHeader('Price', 'price')
  .addHeader('Login', 'accountCard.login')
  .addHeader('Post date', 'postDate')
  .getColumns();

const SellStateList = () => {
  const tableOptions = useTable<SellState>(columns, 'id', 'id', getSellStates);
  return <Table {...tableOptions} />;
};

export default SellStateList;
