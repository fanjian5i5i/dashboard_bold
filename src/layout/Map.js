import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Map  } from '@esri/react-arcgis';
import { loadModules } from 'esri-loader';
import { changeTitle,changeLayout } from '../redux/actions';
import { connect,useDispatch } from 'react-redux';
import csv from '../assets/img/csvjson.json';
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
    height:"80vh"
  }
}));


const Layer = (props) =>{
  const dispatch = useDispatch();


  useEffect(()=>{
    // console.log(props.reducerState.layout)
    dispatch(changeLayout("map"));
  },[]);

  

  useEffect(() => {
    loadModules([
      "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/core/urlUtils"
  ]).then(([Map, MapView, FeatureLayer,urlUtils]) => {

    urlUtils.addProxyRule(
      {proxyUrl :"http://localhost/DotNet/proxy.ashx",
      urlPrefix :"https://services.arcgis.com/"}
    )

    var featureLayer = new FeatureLayer({
        url:"https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/BOLD_RE_parcels_shp/FeatureServer/0",
        popupTemplate: {
          title: "{pid}",
          content: [{
            type: "fields",
            fieldInfos: [{
              fieldName: "full_addre",
              label: "Full Address"
            }]
          }]
        }
    });

    props.map.add(featureLayer);


    });
  },[]);
  return null;
}
function MapView() {
  const classes = useStyles();

  return (
    <Paper className={classes.map}>

    <Map 
      mapProperties={{ basemap: 'gray-vector' }} 
      viewProperties={{
            center: [-71.0589, 42.3601],
            zoom: 13
        }}>
    <Layer />
    </Map>

    </Paper>
  );
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    reducerState: state
  }
}

export default connect(
  mapStateToProps,
)(MapView)