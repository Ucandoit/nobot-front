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
import React, { useContext } from 'react';
import mobileMenuContext from './mobileMenuContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    }
  })
);

const AppBar = () => {
  const classes = useStyles();
  const { toggleMobileMenu } = useContext(mobileMenuContext);
  return (
    <MuiAppBar position="fixed">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">のぶニャがの野望</Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
