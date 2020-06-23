import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Map  } from '@esri/react-arcgis';
import { loadModules } from 'esri-loader';
import { connect, useDispatch  } from 'react-redux';
import { openPopup } from '../redux/actions';
import {
  useHistory 
} from "react-router-dom";
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
    height:"89vh"
  }
}));


const Parcel = (props) => {
  
  const [feature, setFeature] = useState(null);
  const [pid, setPid] = useState(123456789);
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(()=>{
    loadModules(['esri/Graphic',"esri/tasks/QueryTask","esri/tasks/support/Query","esri/layers/FeatureLayer"]).then(([Graphic,QueryTask,Query,FeatureLayer]) => {


      var simpleRenderer = {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [0, 166, 180, 0.5],
          outline: { // autocasts as new SimpleLineSymbol()
              color: [0, 60, 80],
              width: 1
          }
        }
      };


      const labelClass = {
        // autocasts as new LabelClass()
        symbol: {
          type: "text",  // autocasts as new TextSymbol()
          color: "#003c50",
          haloColor: "white",
          font: {  // autocast as new Font()
            // family: "Playfair Display",
            size: 8,
            weight: "bold"
          }
        },
        labelPlacement: "below-center",
        labelExpressionInfo: {
          expression: "$feature.full_address + TextFormatting.NewLine + $feature.pid"
        }
      };
      
      const action = {
        title: "Yes",
        id: "sumbit",
        className: "esri-icon-check-mark"
      };


      var boldUrl =
      "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0";
      const layer = new FeatureLayer({
        // URL to the service
        url: boldUrl,
        renderer:simpleRenderer,
        outFields: ["*"],
        popupEnabled:true,
        popupTemplate:{title : "Go to project {pid} ?",actions:[action]},
        labelingInfo: [labelClass]
        // definitionExpression: "ParcelID = '"+props.pid+"'"
      });

      props.map.add(layer)


      

      var qTask = new QueryTask({
        url: boldUrl
      });

      var params = new Query({
        returnGeometry: true,
        outFields: ["*"],
        where:"pid='"+props.pid+"'"
      });

      qTask
            .execute(params)
            .then((result) =>{
              console.log(result);
    
              // Create a symbol for rendering the graphic
              let fillSymbol = {
                  type: "simple-fill", // autocasts as new SimpleFillSymbol()
                  color: [227, 139, 79, 0],
                  outline: { // autocasts as new SimpleLineSymbol()
                      color: [227, 139, 79],
                      width: 2
                  }
              };
              let graphic = new Graphic({
                  geometry: result.features[0].geometry,
                  symbol: fillSymbol
              });

              props.view.graphics.add(graphic);
              props.view.goTo({target:result.features[0].geometry});
            })
            .catch((err)=>{
              console.log(err)
            });

    })
  },[props.pid])

  useEffect(()=>{
    props.view.popup.on("trigger-action", function(event){
      // If the zoom-out action is clicked, fire the zoomOut() function
      if(event.action.id === "sumbit"){
        console.log(feature);
        history.push("/parcel/"+feature);
        window.location.reload();
      }
    });
  },[feature])
  useEffect(()=>{
    console.log(feature)
    props.view.on("click", function(event) {
      // console.log(event)

      props.view.hitTest(event).then(function(hitTestResult) {
        const results = hitTestResult.results;
        // highlight && highlight.remove();
        // Update the graphic of the Feature widget
        // on pointer-move with the result
        if (results) {
          let i = 0;
          while(i<results.length){
            if(results[i].graphic.attributes && results[i].graphic.attributes.pid ){
              if(results[i].graphic.attributes.pid !== props.pid){
                console.log(results[i].graphic.attributes.pid);
                setFeature(results[i].graphic.attributes.pid)

              }
              
            }
            i++;
          }
        }
      });
    })
  },[])
  return null;

}



export default function ProjectMap(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.map}>

    <Map 
      mapProperties={{ basemap: 'gray-vector' }} 
      viewProperties={{
            center: [-71, 42],
            zoom: 6
        }}>
    <Parcel pid={props.pid} />
    </Map>
        
      
      
    </Paper>
  );
}