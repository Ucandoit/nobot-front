import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from 'react';
import { Link } from 'react-router-dom';

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   }
// });

const useStyles = makeStyles(theme => ({
  menu: {
    position: 'relative',
    overflowX: 'hidden',
    width: '12rem',
    backgroundColor: 'transparent'
    // borderRight: "none",
  }
}));

const menu = [
  {
    name: 'Dashboard',
    to: '/',
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
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text} component={Link} to="/">
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {menu.map(item => (
          <ListItem button key={item.name} component={Link} to={item.to}>
            <ListItemIcon>
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
