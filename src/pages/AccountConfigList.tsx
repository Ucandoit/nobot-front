import { Switch } from '@material-ui/core';
import React, { useCallback } from 'react';
import { getAccountConfigs, patchAccountConfig } from '../api';
import { ColumnBuilder, Table, TableColumn, useTable } from '../commons/table';
import { AccountConfig } from '../helpers';

const AccountConfigList: React.FC = () => {
  const columns: TableColumn<AccountConfig>[] = new ColumnBuilder<AccountConfig>()
    .addColumn('Login', 'login')
    .addColumn('Building', (result: AccountConfig) => {
      return (
        <Switch
          checked={result.building}
          onChange={() => changeFieldValue(result.login, 'building', !result.building)}
          color="primary"
        />
      );
    })
    .addColumn('Training', (result: AccountConfig) => {
      return (
        <Switch
          checked={result.training}
          onChange={() => changeFieldValue(result.login, 'training', !result.training)}
          color="primary"
        />
      );
    })
    .addColumn('Daily login', (result: AccountConfig) => {
      return (
        <Switch
          checked={result.dailyLogin}
          onChange={() => changeFieldValue(result.login, 'dailyLogin', !result.dailyLogin)}
          color="primary"
        />
      );
    })
    .getColumns();

  const [tableOptions, reload] = useTable<AccountConfig>(
    columns,
    { sort: 'login', order: 'asc' },
    [],
    getAccountConfigs
  );

  const changeFieldValue = useCallback(
    async (login: string, field: keyof Omit<AccountConfig, 'login'>, value: boolean) => {
      await patchAccountConfig(login, { [field]: value });
      await reload();
    },
    [reload]
  );

  return <Table {...tableOptions} />;
};

export default AccountConfigList;
