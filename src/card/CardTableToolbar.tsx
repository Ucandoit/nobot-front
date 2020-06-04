import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  title: {
    flex: '1 1 100%'
  }
}));

const CardTableToolbar = () => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="cardTableTitle" component="div">
        Cards
      </Typography>
      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default CardTableToolbar;
