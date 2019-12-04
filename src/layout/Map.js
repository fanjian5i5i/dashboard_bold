import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Map  ,WebMap } from '@esri/react-arcgis';
import { loadModules } from 'esri-loader';
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
  useEffect(() => {
    loadModules([
      "esri/layers/Layer",
      "esri/widgets/Legend"
  ]).then(([Layer,Legend]) => {

    props.view.when(function() {
      // get the first layer in the collection of operational layers in the WebMap
      // when the resources in the MapView have loaded.
      var featureLayer = props.map.layers.getItemAt(0);

      var legend = new Legend({
        view: props.view,
        layerInfos: [
          {
            layer: featureLayer,
            title: "Legend"
          }
        ]
      });

      // Add widget to the bottom right corner of the view
      props.view.ui.add(legend, "bottom-right");
    });


    });
  });
  return null;
}
export default function AutoGrid() {
  const classes = useStyles();
  const handleLoad = e =>{
    console.log(e)
  }
//   <Map 
//   mapProperties={{ basemap: 'gray-vector' }} 
//   viewProperties={{
//         center: [-71.0589, 42.3601],
//         zoom: 12
//     }}>
// <Layer />
// </Map>
  return (
    <Paper className={classes.map}>

      <WebMap id="5349693a40434a8193eaf4caa6591dc5" onLoad={handleLoad}>
        <Layer/>  
      </WebMap>
        

        
    
      
    </Paper>
  );
}