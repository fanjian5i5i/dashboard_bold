import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Value from './Value';
import ProjectDetail from './ProjectDetail';
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch  } from 'react-redux';
import { updateData, resetData, createOriginal } from '../redux/actions';
import {
  useParams 
} from "react-router-dom";
import axios from 'axios';
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
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  let {pid} = useParams();
  React.useEffect(() => {
    axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json")
    .then(result =>{
      dispatch(updateData(result.data.layers[0].features))
      dispatch(createOriginal(result.data.layers[0].features));
      setData(result.data.layers[0].features);
    })
  },[]);
//<Placeholder/>
  return (
    <div className={classes.root}>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          {pid}
        </Grid>   
        <Grid item xs={12} md={6} lg={6}>
          <ProjectDetail/>
        </Grid>     
      </Grid>
      
    </div>
  );
}