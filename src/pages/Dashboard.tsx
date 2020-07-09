import { LinearProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import { AccountSelector, useAccountSelector } from '../account';
import { getVillage } from '../api';
import { useAsyncFunction } from '../helpers';
import { Village } from '../village';

const useStyles = makeStyles({
  progress: {
    width: '100%'
  }
});

const DashBoard: React.FC = props => {
  const classes = useStyles();
  const { selectedAccount, changeAccount } = useAccountSelector();
  const [village, loading] = useAsyncFunction(getVillage, undefined, selectedAccount);

  return (
    <>
      <AccountSelector selectedAccount={selectedAccount} changeAccount={changeAccount} />
      {loading ? <LinearProgress className={classes.progress} /> : <Village village={village} />}
    </>
  );
};

export default DashBoard;
