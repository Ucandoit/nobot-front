import {
  AppBar as MuiAppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
);

const AppBar = () => {
  const classes = useStyles();
  return (
    <MuiAppBar position="fixed">
      <Toolbar variant="dense">
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">のぶニャがの野望</Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
