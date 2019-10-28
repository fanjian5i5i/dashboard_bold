import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PieChart from '../components/charts/Pie';
import NeighborhoodChart from './NeighborhoodChart';
import RecentProject from './RecentProject';
import StatusChart from './StatusChart';
import Area from './Area';
import Placeholder from './Placeholder';
import Value from './Value';
import { placeholder } from '@babel/types';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // padding: theme.spacing(2),
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
        <Grid item xs={12} md={4} lg={3}>
          <Area/>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Value/>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Placeholder/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RecentProject/>
        </Grid>

        <Grid item xs={12} md={6} lg={4} >
          <StatusChart/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <NeighborhoodChart/>
        </Grid>

        
      </Grid>
      
    </div>
  );
}