import { Button, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getLastMobileAccount, saveMobileAccount } from '../api';

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    width: '20rem'
  }
}));

const getNextLogin = (lastLogin: string): string => {
  const match = lastLogin.match(/(.+[0]+)([1-9][0-9]*)/);
  if (match && match.length > 0) {
    const prefix = match[1];
    let number = parseInt(match[2]);
    number += 1;
    return number === 10 || number === 100 || number === 1000
      ? `${prefix.slice(0, -1)}${number}`
      : `${prefix}${number}`;
  }
  return '';
};

const MobileAccountCreate: React.FC = () => {
  const classes = useStyle();

  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [cookie, setCookie] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const calculateLogin = useCallback(async () => {
    const lastLogin = await getLastMobileAccount();
    const nextLogin = getNextLogin(lastLogin);
    setLogin(nextLogin);
  }, []);

  useEffect(() => {
    calculateLogin();
  }, [calculateLogin]);

  const changeLogin = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  }, []);

  const changeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const changeCookie = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCookie(event.target.value);
  }, []);

  const changeExpirationDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(event.target.value);
  }, []);

  const save = useCallback(async () => {
    await saveMobileAccount({
      login,
      name,
      cookie: `SP_LOGIN_SESSION=${cookie};`,
      expirationDate,
      mobile: true
    });

    const nextLogin = getNextLogin(login);
    setLogin(nextLogin);
    setName('');
    setCookie('');
    setExpirationDate('');
  }, [cookie, expirationDate, login, name]);

  return (
    <Paper className={classes.root}>
      <TextField
        label="Login"
        className={classes.textField}
        margin="dense"
        variant="outlined"
        value={login}
        onChange={changeLogin}
      />
      <TextField
        label="Name"
        className={classes.textField}
        margin="dense"
        variant="outlined"
        value={name}
        onChange={changeName}
      />
      <TextField
        label="Cookie"
        className={classes.textField}
        margin="dense"
        variant="outlined"
        value={cookie}
        onChange={changeCookie}
      />
      <TextField
        label="Expiration date"
        className={classes.textField}
        margin="dense"
        variant="outlined"
        value={expirationDate}
        onChange={changeExpirationDate}
      />
      <Button variant="contained" color="primary" onClick={save}>
        Create
      </Button>
    </Paper>
  );
};

export default MobileAccountCreate;
