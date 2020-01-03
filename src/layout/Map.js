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
      "esri/widgets/Legend",
      "esri/widgets/LayerList"
  ]).then(([Layer,Legend,LayerList]) => {

    props.view.when(function() {
      
      // get the first layer in the collection of operational layers in the WebMap
      // when the resources in the MapView have loaded.
      var ldaLayer = props.map.layers.getItemAt(1);
      // ldaLayer.visible = true;
      var boldLayer = props.map.layers.getItemAt(2);
      var zoningLayer = props.map.layers.getItemAt(0);
      var neighborhoodLayer = props.map.layers.getItemAt(3);
      var legend = new Legend({
        view: props.view,
        layerInfos: [
          {
            layer: boldLayer,
          },
          {
            layer: ldaLayer
          },
          {
            layer:zoningLayer
          },
          {
            layer:neighborhoodLayer
          }
          
        ]
      });



      var layerList = new LayerList({
        view: props.view
      });

      // Add widget to the bottom right corner of the view
      props.view.ui.add(legend, "bottom-right");
      props.view.ui.add(layerList,  "top-right");
    });


    });
  },[]);
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