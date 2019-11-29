import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { WebMap } from '@esri/react-arcgis';
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
  map:{
    height:"50vh"
  }
}));

export default function AutoGrid() {
  const classes = useStyles();
  return (
    <Paper className={classes.map}>


        
      <WebMap id="0ea3e2de324e4c74a901dc55a730275e"/>
      
    </Paper>
  );
}