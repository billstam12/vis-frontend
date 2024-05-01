import React from 'react';
import { Theme } from '@mui/material/styles';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div >
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;