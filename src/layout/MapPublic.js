import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Map  ,WebMap } from '@esri/react-arcgis';
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
      if(window.innerWidth >= 1000 ) {
        props.view.ui.add(legend, "bottom-right");
        
      }
      if(window.innerWidth >= 600 ) {
      props.view.ui.add(layerList,  "top-left");
      }
    });


    });
  },[]);
  return null;
}
function MapView() {
  const classes = useStyles();
  const handleLoad = e =>{
    console.log(e)
  }

  // const test = e =>{
  //   loadModules(["esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([FeatureLayer,Query]) => {
  //     const layer = new FeatureLayer({
  //       url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0",
  //     });

      



  //     csv.forEach(async (record,index) =>{
  //       if(index > 100 && index <=1000 && record.pid){
  //         let query = new Query();
  //         query.outFields = [ "*" ];
  //         query.returnGeometry = false;
  //         query.where = "pid = '" + record.pid + "'";
  //         // setTimeout(function(){ alert("Hello"); }, 500);
  //         let results = await layer.queryFeatures(query);
  //         if(results.features[0]){
  //           let temp = results.features[0]
  //           temp.attributes["project_status"] = record["New Status"];
  //           console.log(temp);
  //           let promise = layer.applyEdits({
  //             updateFeatures: [temp]
  //           });
  //           promise.then(result =>{
  //             console.log(result);
  //           })
  //         }
          
  //         // layer.queryFeatures(query).then(function(results){
  //         //   count++
  //         //   let tempAtt = results.features[0].attributes;
  //         //   console.log(tempAtt);  
  //         // });
  //       }
  //     })

      
  //   });
  // }

  // useEffect(()=>{
  //   loadModules(["esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([FeatureLayer,Query]) => {
  //     const layer = new FeatureLayer({
  //       url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0",
  //     });

      



  //     csv.forEach(async (record,index) =>{
  //       if(index <=100 && record.pid){
  //         let query = new Query();
  //         query.outFields = [ "*" ];
  //         query.returnGeometry = false;
  //         query.where = "pid = '" + record.pid + "'";
  //         let results = await layer.queryFeatures(query);
  //         if(results.features[0]){
  //           let temp = results.features[0].attributes
  //           temp["project_status"] = record["New Status"];
  //           console.log(temp)
  //         }
          
  //         // layer.queryFeatures(query).then(function(results){
  //         //   count++
  //         //   let tempAtt = results.features[0].attributes;
  //         //   console.log(tempAtt);  
  //         // });
  //       }
  //     })

      
  //   });
  // },[])
//   <Map 
//   mapProperties={{ basemap: 'gray-vector' }} 
//   viewProperties={{
//         center: [-71.0589, 42.3601],
//         zoom: 12
//     }}>
// <Layer />
// </Map>
        

        
    
{/* <button onClick={test}>test </button> */}
  return (
    <Paper className={classes.map}>

      <WebMap id="cf347f9eb5534d3192340bdc7b67a0f5" onLoad={handleLoad}>
        <Layer/>  
      </WebMap>

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