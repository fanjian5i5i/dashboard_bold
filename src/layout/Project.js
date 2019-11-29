import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Value from './Value';
import ProjectDetail from './ProjectDetail';
import Map from './projectMap';
import ProjectImage from './ProjectImage'
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch  } from 'react-redux';

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




export default function Project() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [geometry, setGeometry] = React.useState()
  const dispatch = useDispatch();
  let {pid} = useParams();
  React.useEffect(() => {
    axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'ParcelID="+pid+"'}&returnGeometry=true&f=json")
    .then(result =>{
      // dispatch(updateData(result.data.layers[0].features))
      // dispatch(createOriginal(result.data.layers[0].features));
      let tempProject = result.data.layers[0].features[0].attributes;
      setData(tempProject);

      setGeometry(result.data.layers[0].features[0].geometry)
      console.log(tempProject)
      let fields = [];
      for (var key in tempProject) {
        if (tempProject.hasOwnProperty(key)) {
            
            let temp = {};
            // temp[key] = props.project[key]
            temp.fieldName = key;
            temp.value = tempProject[key]
            // console.log(key + " -> " + p[key]);
            fields.push(temp)
            console.log(temp)
        }
      }

      setFields(fields)
    })
  },[]);
//<Placeholder/>
  return (
    <div className={classes.root}>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          
          <ProjectDetail fields={fields} pid={pid}/>
        </Grid>  
        <Grid item xs={12} md={6} lg={6} container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>

              <ProjectImage pid={pid} fields={fields}/>

          </Grid>     
          <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <Map pid={pid}/>
            </Paper>
          </Grid>  
        </Grid>     
      </Grid>
      
    </div>
  );
}