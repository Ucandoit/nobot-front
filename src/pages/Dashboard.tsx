import React from 'react';
import { AccountSelector } from '../account';
import { AccountContextProvider, Village } from '../village';

const DashBoard: React.FC = () => (
  <AccountContextProvider>
    <AccountSelector />
    <Village />
  </AccountContextProvider>
);

export default DashBoard;
