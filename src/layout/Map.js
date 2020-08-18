import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Map  } from '@esri/react-arcgis';
import { loadModules } from 'esri-loader';
import { changeTitle,changeLayout } from '../redux/actions';
import { connect,useDispatch } from 'react-redux';
import csv from '../assets/data.json';
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
      "esri/views/MapView", 
      "esri/WebMap",
      "esri/layers/FeatureLayer",
        "esri/layers/Layer",
      "esri/widgets/Legend",
      "esri/Graphic",
      "esri/widgets/LayerList",
      "esri/core/urlUtils",
        "esri/config"
  ]).then(([MapView, WebMap, FeatureLayer, Layer, Legend, Graphic, LayerList,urlUtils,esriConfig]) => {
    // console.log(props.view)
    // urlUtils.addProxyRule(
    //   {proxyUrl :"https://gis.bostonplans.org/DotNet/proxy.ashx",
    //   urlPrefix :"https://gis.bostonplans.org/"}
    // )
    esriConfig.portalUrl = "https://gis.bostonplans.org/portal";
    console.log(esriConfig)
    const layer = new FeatureLayer({
      // URL to the service
      url: "https://gis.bostonplans.org/hosting/rest/services/Hosted/BOLD_Public_WM/FeatureServer/0"
    });
    // console.log(layer)
    // props.map.add(layer)
    // layer.queryFeatures().then(function(results){
    //   // prints the array of result graphics to the console
    //   console.log(results.features);
    //   results.features.forEach(feature => {
    //     console.log(feature.attributes.project_st)
    //   })
    // });
    // console.log(csv)
    let sum = 0
    csv.forEach(record=>{
      // console.log(record.pid)
      layer.queryFeatures().then(function(results){
          // prints the array of result graphics to the console
          results.features.forEach(feature => {
            // console.log(feature.attributes.project_st)

            if(record.pid == feature.attributes.pid && record.public_status !== feature.attributes.public_sta){
              sum += 1
              console.log(sum)  
              // feature.attributes.public_sta = record.public_status;
              // let updateFeature =  new Graphic({
              //   geometry: feature.geometry,
              //   attributes: feature.attributes
              // });

              // layer.applyEdits({
              //   updateFeatures: [updateFeature]
              // }).then(result =>{
              //   console.log(result)
              // })
              // promise.then(result =>{
              //   console.log(result);
              // })

            }
          })
        });
        
    })
    // let webmap = new WebMap({
    //   portalItem: {
    //     // autocasts as new PortalItem()
    //     id: "cf347f9eb5534d3192340bdc7b67a0f5"
    //   }
    // });
    // props.view.map= webmap;
    // let layerInfo = [];
    // var legend = new Legend({
    //   view: props.view,
    //   layerInfos: layerInfo
    // });
    // props.view.ui.add(legend, "bottom-right");
    // props.view.on("layerview-create", function (event) {
    //   legend.refresh()
    // });
    // props.view.when(function() {
    //   var layerList = new LayerList({
    //     view: props.view
    //   });
    //   if(window.innerWidth >= 600 ) {
    //   props.view.ui.add(layerList,  "top-left");
    //   }
    // })


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