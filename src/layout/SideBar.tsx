import { Drawer, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  menu: {
    position: 'relative',
    overflowX: 'hidden',
    width: '12rem',
    backgroundColor: 'transparent'
    // borderRight: "none",
  },
  itemIcon: {
    minWidth: 'unset',
    marginRight: '1em'
  }
}));

const menu = [
  {
    name: 'Dashboard',
    to: '/',
    icon: 'mail'
  },
  {
    name: 'Accounts',
    to: '/accounts',
    icon: 'mail'
  },
  {
    name: 'War',
    to: '/war',
    icon: 'mail'
  },
  {
    name: 'Auction History',
    to: '/auction_history',
    icon: 'mail'
  },
  {
    name: 'Sell',
    to: '/auction/sell',
    icon: 'euro_symbol'
  },
  {
    name: 'Story',
    to: '/story',
    icon: 'mail'
  },
  {
    name: 'Draw Card',
    to: '/draw_card',
    icon: 'mail'
  },
  {
    name: 'Recruit',
    to: '/recruit',
    icon: 'mail'
  },
  {
    name: 'Cards',
    to: '/cards',
    icon: 'mail'
  }
];

const SideBar = () => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      PaperProps={{
        className: classes.menu
      }}
    >
      <div role="presentation">
        {menu.map(item => (
          <ListItem button key={item.name} component={Link} to={item.to}>
            <ListItemIcon className={classes.itemIcon}>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </div>
    </Drawer>
  );
};

export default SideBar;
