import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom
import { makeStyles, createStyles } from '@mui/styles'; 
import { Drawer, List, ListItem, ListItemText, Theme,} from '@mui/material';


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
    fixedSidebar: {
      position: 'fixed', // Fix the sidebar position
      top: 0, // Align the sidebar to the top of the viewport
      left: 0, // Align the sidebar to the left of the viewport
      height: '100vh', // Set the sidebar height to fill the viewport height
    },
  })
);

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const handleItemClick = (route: string) => {
    navigate(route); // Using navigate instead of history.push
  };

  return (
    <Drawer
      className={`${classes.drawer} ${classes.fixedSidebar}`} // Combine drawer and fixedSidebar classes

      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button key="Dashboard" onClick={() => handleItemClick('/')} >
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="Data_Explanation " onClick={() => handleItemClick('/data_explanation')} >
          <ListItemText primary="Data Explanation" />
        </ListItem>
        <ListItem button key="Explainability" onClick={() => handleItemClick('/explainability')}>
          <ListItemText primary="Explaiability" />
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