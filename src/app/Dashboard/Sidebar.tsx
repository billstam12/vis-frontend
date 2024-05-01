import React from 'react';
import { makeStyles, createStyles } from '@mui/styles'; 
import { Drawer, List, ListItem, ListItemText, Theme } from '@mui/material';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  })
);

const Sidebar: React.FC = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button key="Dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="Users">
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button key="Settings">
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;