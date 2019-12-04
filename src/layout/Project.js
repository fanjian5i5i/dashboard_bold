import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Value from './Value';
import ProjectDetail from './ProjectDetail';
import Map from './projectMap';
import { loadModules } from 'esri-loader';
import ProjectImage from './ProjectImage'
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch  } from 'react-redux';

import {
  useParams 
} from "react-router-dom";
import axios from 'axios';
import { changeTitle } from '../redux/actions';
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


    dispatch(changeTitle(pid))
    // axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'ParcelID="+pid+"'}&returnGeometry=true&f=json")
    loadModules(['esri/Graphic',"esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([Graphic,FeatureLayer,Query]) => {
      const layer = new FeatureLayer({
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_RE_parcels/FeatureServer/0",
      });
      const query = new Query();
      query.where = "pid = '"+pid+"'";
      query.returnGeometry = true;
      query.outFields = [ "*" ];


      layer.queryFeatures(query).then(function(results){
        console.log(results.features);  // prints the array of features to the console
              let fields = [];
              let tempProject = results.features[0].attributes;
              setData(tempProject);
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
      });
    });
    // axios.get("http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_RE_parcels/FeatureServer/query?layerDefs={'2':'pid='"+pid+"'}&returnGeometry=true&f=json")
    // .then(result =>{
    //   // dispatch(updateData(result.data.layers[0].features))
    //   // dispatch(createOriginal(result.data.layers[0].features));
    //   console.log(result)
    //   let tempProject = result.data.layers[0].features[0].attributes;
    //   setData(tempProject);

    //   setGeometry(result.data.layers[0].features[0].geometry)
    //   console.log(tempProject)
    //   let fields = [];
    //   for (var key in tempProject) {
    //     if (tempProject.hasOwnProperty(key)) {
            
    //         let temp = {};
    //         // temp[key] = props.project[key]
    //         temp.fieldName = key;
    //         temp.value = tempProject[key]
    //         // console.log(key + " -> " + p[key]);
    //         fields.push(temp)
    //         console.log(temp)
    //     }
    //   }

    //   setFields(fields)
    // })
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