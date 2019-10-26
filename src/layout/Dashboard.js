import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PieChart from '../components/charts/Pie';
import NeighborhoodChart from './NeighborhoodChart';
import RecentProject from './RecentProject';
import StatusChart from './StatusChart';
import Area from './Area';
import Area2 from './Area2';
import Area3 from './Area3';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Area/>
        </Grid>
        <Grid item xs={12} md={3}>
          <Area3/>
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentProject/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={12} md={6} >
          <StatusChart/>
        </Grid>
        <Grid item xs={12} md={6}>
          <NeighborhoodChart/>
        </Grid>

        
      </Grid>
      
    </div>
  );
}