import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Map  } from '@esri/react-arcgis';
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
    height:"40vh"
  }
}));


const BermudaTriangle = (props) => {
  
  const [feature, setFeature] = useState(null);
  const [pid, setPid] = useState(123456789);

  useEffect(() => {
      console.log(props.pid)
      loadModules(['esri/Graphic',"esri/layers/FeatureLayer"]).then(([Graphic,FeatureLayer]) => {
          // // Create a polygon geometry
          // const polygon = {
          //     type: "polygon", // autocasts as new Polygon()
          //     rings: props.geometry ? props.geometry.rings: [],
          //     spatialReference: { wkid: 3857 }
          // };

          // // Create a symbol for rendering the graphic
          // const fillSymbol = {
          //     type: "simple-fill", // autocasts as new SimpleFillSymbol()
          //     color: [227, 139, 79, 0.8],
          //     outline: { // autocasts as new SimpleLineSymbol()
          //         color: [255, 255, 255],
          //         width: 1
          //     }
          // };

          // // Add the geometry and symbol to a new graphic
          // const graphic = new Graphic({
          //     geometry: polygon,
          //     symbol: fillSymbol
          // });
          // setGraphic(graphic);
          // props.view.graphics.add(graphic);

          const layer = new FeatureLayer({
            // URL to the service
            url: "http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/0",
            // definitionExpression: "ParcelID = '"+props.pid+"'"
          });
          if(props.pid){
            layer.definitionExpression = "ParcelID = '"+props.pid+"'"
            props.map.layers.add(layer);
            setPid(pid);
          };

          props.view.whenLayerView(layer).then(function(layerView) {
            layerView.watch("updating", function(value) {
              console.log(value)
              if (!value) {
                // wait for the layer view to finish updating
            
                // get all the features available for drawing.
                layerView
                  .queryFeatures({
                    geometry: props.view.extent,
                    returnGeometry: true
                  })
                  .then(function(results) {
                    // do something with the resulting graphics
                    // graphics = results.features;
                    console.log(results)
                    setFeature(results.features[0].attributes.OBJECTID);

                    if(feature != results.features[0].attributes.OBJECTID){
                      props.view.goTo({target:results.features[0].geometry});
                    }
                    
                  });
              }
            });
          });


          

          
          

      }).catch((err) => console.error(err));

      // return function cleanup() {
      //     props.view.graphics.remove(graphic);
      // };
  }, [pid]);

  return null;

}
export default function ProjectMap(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.map}>

    <Map 
      mapProperties={{ basemap: 'gray' }} 
      viewProperties={{
            center: [-71, 42],
            zoom: 6
        }}>
    <BermudaTriangle pid={props.pid} />
    </Map>
        
      
      
    </Paper>
  );
}