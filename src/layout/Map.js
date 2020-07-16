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
      "esri/views/MapView", 
      "esri/WebMap",
        
        "esri/layers/Layer",
      "esri/widgets/Legend",
      "esri/widgets/LayerList",
      "esri/core/urlUtils",
        "esri/config"
  ]).then(([MapView, WebMap, Layer, Legend, LayerList,urlUtils,esriConfig]) => {
    // console.log(props.view)
    // urlUtils.addProxyRule(
    //   {proxyUrl :"https://gis.bostonplans.org/DotNet/proxy.ashx",
    //   urlPrefix :"https://gis.bostonplans.org/"}
    // )
    esriConfig.portalUrl = "https://gis.bostonplans.org/portal";
    console.log(esriConfig)

    let webmap = new WebMap({
      portalItem: {
        // autocasts as new PortalItem()
        id: "cf347f9eb5534d3192340bdc7b67a0f5"
      }
    });
    props.view.map= webmap;
    props.view.when(function() {
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


      if(window.innerWidth >= 1000 ) {
        props.view.ui.add(legend, "bottom-right");
        
      }
      if(window.innerWidth >= 600 ) {
      props.view.ui.add(layerList,  "top-left");
      }
    })
    // var featureLayer = new FeatureLayer({
    //     // url:"https://gis.bostonplans.org/hosting/rest/services/Feature/BOLD/FeatureServer/0",
    //     portalItem: {
    //       id: "87a67bd2f0e34fd68b5835e6510258eb"
    //     },
    //     // layerId: 0,
    //     // popupTemplate: {
    //     //   title: "{pid}",
    //     //   content: [{
    //     //     type: "fields",
    //     //     fieldInfos: [{
    //     //       fieldName: "full_addre",
    //     //       label: "Full Address"
    //     //     },
    //     //     {
    //     //       fieldName: "zipcode",
    //     //       label: "ZIP Code"
    //     //     },
    //     //     {
    //     //       fieldName: "neighborhood",
    //     //       label: "Neighborhood"
    //     //     },
    //     //     {
    //     //       fieldName: "zoning_subdistrict",
    //     //       label: "Zoning Subdistrict"
    //     //     },
    //     //     {
    //     //       fieldName: "ur_area",
    //     //       label: "UR Area"
    //     //     },
    //     //     {
    //     //       fieldName: "ur_number",
    //     //       label: "UR Number"
    //     //     },
    //     //     {
    //     //       fieldName: "ur_parcel_name",
    //     //       label: "UR Parcel"
    //     //     },
    //     //     {
    //     //       fieldName: "owner",
    //     //       label: "Owner"
    //     //     },{
    //     //     fieldName: "lot_size",
    //     //     label: "Lot Size"
    //     //   },{
    //     //     fieldName: "gross_area",
    //     //     label: "Built Sqft"
    //     //   }]
    //     //   }]
    //     // }
    // });

    // if(!featureLayer.loaded){             
    //   featureLayer.on('load', () => {                    
    //       console.log('load');                
    //   })
    //   }else{                
    //     console.log('loading');              
    //   }
    // props.map.add(featureLayer);


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