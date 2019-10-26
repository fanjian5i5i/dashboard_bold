import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PieChart from '../components/charts/Pie';
import RecentProect from './RecentProject2';
import StatusChart from './StatusChart';
import Area from './Area';
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
        <Grid item xs={12} md={5}>
          <StatusChart/>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentProect/>
        </Grid>
        <Grid item xs={12} md={3} >
          <Area/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}