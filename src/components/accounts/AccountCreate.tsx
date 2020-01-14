import React from 'react';
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton
} from 'react-admin';

const AccountCreate: React.FC = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="login" />
      <TextInput source="name" />
      <TextInput source="cookie" />
      <DateInput source="expirationDate" defaultValue={new Date()} />
    </SimpleForm>
  </Create>
);

export default AccountCreate;
