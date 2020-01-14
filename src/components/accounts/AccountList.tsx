import React from 'react';
import { List, Datagrid, TextField, BooleanField, DateField, NumberField } from 'react-admin';

const AccountList: React.FC = props => {
  return (
    <List {...props} sort={{ field: 'login', order: 'asc' }} perPage={25}>
      <Datagrid rowClick="edit">
        <TextField source="login" />
        <TextField source="name" sortable={false} />
        <TextField source="cookie" sortable={false} />
        <DateField source="expirationDate" locales="fr-FR" showTime /> {/* TODO: use custom component later */}
        <NumberField source="startHour" />
        <BooleanField source="enabled" sortable={false} />
      </Datagrid>
    </List>
  );
};

export default AccountList;
