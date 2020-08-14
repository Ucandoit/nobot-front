import { Drawer, Hidden, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import menu from './menu';
import mobileMenuContext from './mobileMenuContext';

const useStyles = makeStyles(theme => ({
  menu: {
    position: 'relative',
    overflowX: 'hidden',
    width: '12rem',
    backgroundColor: 'transparent'
  },
  mobileMenu: {
    position: 'relative',
    overflowX: 'hidden',
    width: '12rem'
  },
  itemIcon: {
    minWidth: 'unset',
    marginRight: '1em'
  }
}));

const SideBar = () => {
  const classes = useStyles();
  const { mobileMenuOpen, toggleMobileMenu } = useContext(mobileMenuContext);
  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          // container={window !== undefined ? () => window.document.body : undefined}
          anchor="left"
          variant="temporary"
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          PaperProps={{
            className: classes.mobileMenu
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
      </Hidden>
      <Hidden xsDown implementation="css">
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
      </Hidden>
    </>
  );
};

export default SideBar;
