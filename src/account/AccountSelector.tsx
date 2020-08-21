import { FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import moment from 'moment';
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import request from 'superagent';
import { AccountInfo } from '../helpers';
import { accountContext } from '../village';

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '3rem'
  },
  selectWrapper: {
    textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const AccountSelector: React.FC = () => {
  const now = moment.now();

  const classes = useStyles();

  const [accounts, setAccounts] = useState<AccountInfo[]>([]);

  const getAccounts = useCallback(async () => {
    const response = await request.get(`${ROOT_API}/api/accounts`);
    setAccounts(response.body);
  }, []);

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  const { account, setAccount } = useContext(accountContext);

  const handleChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      setAccount(event.target.value as string);
    },
    [setAccount]
  );

  const checkExpired = useCallback(expirationDate => moment(expirationDate).isBefore(now), [now]);

  return (
    <Grid container justify="space-between">
      <IconButton aria-label="back">
        <KeyboardArrowLeftIcon className={classes.icon} />
      </IconButton>
      <Grid item xs={4} className={classes.selectWrapper}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="account-label">Account</InputLabel>
          <Select labelId="account-label" id="account" value={account} onChange={handleChange} label="Account">
            {accounts.map(account => (
              <MenuItem key={account.login} value={account.login} disabled={checkExpired(account.expirationDate)}>
                {account.login}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <IconButton aria-label="next">
        <KeyboardArrowRightIcon className={classes.icon} />
      </IconButton>
    </Grid>
  );
};

export default AccountSelector;
