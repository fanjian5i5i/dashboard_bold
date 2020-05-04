import React , {useEffect}from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect, useDispatch } from 'react-redux';
import { Map  } from '@esri/react-arcgis';
import { loadModules } from 'esri-loader';
import axios from 'axios';
import {
  useHistory
} from "react-router-dom";
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // overflow: 'hidden',
  },
  dialog:{
    maxWidth:"none !important",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    color: "white",
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ProjectCreateDialog = withStyles(styles)(props=> {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { classes } = props;
  const handleClickOpen = () => {
    setOpen(true);
    dispatch({type:'OPEN_DIALOG'})
  };
  const handleClose = () => {
    setOpen(false);
    dispatch({type:'OPEN_DIALOG'})
  };


  const Layer = (props) =>{
    let history = useHistory();

    const [query, setQuery] = React.useState(null);

    useEffect(() => {
      loadModules([
          "esri/Graphic"
      ]).then(([Graphic]) => {

        if(query){
          console.log(query);
          props.view.graphics.removeAll();
          const attributes = {};
          attributes["pid"] = query.attributes.PID;
          attributes["full_address"] = query.attributes.FULL_ADDRE;
          attributes["lot_size"] = query.attributes.LAND_SF;
          attributes["gross_area_19"] = query.attributes.LIVING_ARE;
          attributes["land_value19"] = query.attributes.AV_LAND;
          attributes["building_value19"] = query.attributes.AV_BLDG;
          attributes["total_value19"] = query.attributes.AV_TOTAL;
          attributes["owner"] = query.attributes.OWNER;
          attributes["zoning_subdistrict"] = query.attributes.zoning_subdistrict;
          attributes["ur_area"] = query.attributes.ur_area;
          let graphic = new Graphic({
              geometry: query.geometry,
              attributes:attributes,
              symbol: {
                    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                    color: [ 191, 0, 255, 0.5],
                    outline: {  // autocasts as new SimpleLineSymbol()
                      width: 1,
                      color: "lightblue"
                    }
                  }
            });
            props.view.popup.dockEnabled = true;
            props.view.popup.dockOptions = {
              position:"bottom-right"
            }

            const createAction = {
              title: "Sumbit",
              id: "sumbit",
              className: "esri-icon-check-mark"
            };



          props.view.popup.open({
            // Set the popup's title to the coordinates of the location
            title: query.attributes.PID,
            location: query.geometry.centroid,// Set the location of the popup to the clicked location
            content: "<div><strong>Full Address</strong>: "+query.attributes.FULL_ADDRE+"</div><br/>" +
            "<div><strong>Lot Size</strong>: "+query.attributes.LAND_SF+"</div><br/>" +
            "<div><strong>Gross Area</strong>: "+query.attributes.LIVING_ARE+"</div><br/>" +
            "<div><strong>Land Value</strong>: "+query.attributes.AV_LAND+"</div><br/>" +
            "<div><strong>Building Value</strong>: "+query.attributes.AV_BLDG+"</div><br/>" +
            "<div><strong>Total Value</strong>: "+query.attributes.AV_TOTAL+"</div><br/>" +
            "<div><strong>Owner</strong>: "+query.attributes.OWNER+"</div><br/>" +
            "<div><strong>Neighborhood</strong>: "+query.attributes.neighborhood+"</div><br/>" +
            "<div><strong>Sub District</strong>: "+query.attributes.zoning_subdistrict+"</div><br/>" +
            "<div><strong>UR Area</strong>: "+query.attributes.ur_area+"</div><br/>" ,
            actions: [createAction]
          });
          props.view.graphics.add(graphic);


        }

      });
    },[query])
    useEffect(() => {
      loadModules([
        "esri/Graphic","esri/layers/FeatureLayer"
    ]).then(([Graphic,FeatureLayer]) => {
      const layer = new FeatureLayer({
        // URL to the service
        id:"parcel",
        url: "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/Parcels19WMFull/FeatureServer/0",
        outFields:["*"],
        renderer:{
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [ 128, 128, 128, 0],
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 1,
              color: [ 220, 220, 220]
            }
          }
        }
        

      });
      const layer2 = new FeatureLayer({
        // URL to the service
        id:"subdistrict",
        url: "http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/Bos_Zoning_Viewer_WGS/MapServer/1",
        outFields:["ZONE_","DISTRICT","SUBDISTRIC"],
        // opacity:0.5
      });

      const layer3 = new FeatureLayer({
        // URL to the service
        id:"ur",
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/Urban_Renewal_Data4/MapServer/3",
        outFields:["NAME"],
        opacity:0.5
      });


      const layer4 = new FeatureLayer({
        // URL to the service
        id:"neighborhood",
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BPDA_Neighborhoods_CNY_RLFMP/FeatureServer/0",
        outFields:["Name"],
        opacity:0.5
      });

      


      

      props.map.layers.addMany([layer4,layer3,layer,layer2]);


      props.view.on("click", function(event){

        var query = layer.createQuery();
        query.geometry = event.mapPoint;
        layer.queryFeatures(query).then(result=>{
          // console.log(result);
          // setQuery(result.features[0]);
          let feature = result.features[0]
          query = layer2.createQuery();
          query.geometry = event.mapPoint;
          layer2.queryFeatures(query).then(result=>{
            
            feature.attributes.zoning_subdistrict = result.features[0].attributes.ZONE_;
           
            query = layer4.createQuery();
            query.geometry = event.mapPoint;

            layer4.queryFeatures(query).then(result=>{
            
              feature.attributes.neighborhood = result.features[0].attributes.Name;
              query = layer3.createQuery();
              query.geometry = event.mapPoint;
              layer3.queryFeatures(query).then(result=>{
  
                if(result.features.length != 0){
                  feature.attributes.ur_area = result.features[0].attributes.NAME;
                  setQuery(feature);
                }else{
                  setQuery(feature);
                }
                
  
            });
            
            })

            

          })

        })

      });
    })
  },[]);
    useEffect(() => {
      loadModules([
        "esri/widgets/Search","esri/layers/FeatureLayer"
    ]).then(([Search,FeatureLayer]) => {
      var searchWidget = new Search({
        view: props.view,
        popupEnabled:false
      });
      searchWidget.on("suggest-complete",(event)=>{
        console.log(event);
        if(event.searchTerm.length == 10 && !isNaN(event.searchTerm.length)){
          let layer = props.map.findLayerById("parcel")
          var query = layer.createQuery();
          query.where = "PID_LONG LIKE '%"+event.searchTerm+"%'";
          layer.queryFeatures(query).then(result=>{
            console.log(result);
          // setQuery(result.features[0]);
          let layer2 = props.map.findLayerById("subdistrict");
          let layer3 = props.map.findLayerById("ur")
          let layer4 = props.map.findLayerById("neighborhood")

          let feature = result.features[0]
          query = layer2.createQuery();
          query.geometry = feature.geometry.centroid
          layer2.queryFeatures(query).then(result=>{
            
            feature.attributes.zoning_subdistrict = result.features[0].attributes.ZONE_;
           
            query = layer4.createQuery();
            query.geometry = feature.geometry.centroid

            layer4.queryFeatures(query).then(result=>{
            
              feature.attributes.neighborhood = result.features[0].attributes.Name;
              query = layer3.createQuery();
              query.geometry = feature.geometry.centroid
              layer3.queryFeatures(query).then(result=>{
  
                if(result.features.length != 0){
                  feature.attributes.ur_area = result.features[0].attributes.NAME;
                  setQuery(feature);
                }else{
                  setQuery(feature);
                }
                
  
            });
            
            })

            

          })
          props.view.goTo(result.features[0].geometry)
          });
        }


      })
      searchWidget.on("select-result",(result1)=>{
        console.log(result1.result.feature.attributes);
        let layer = props.map.findLayerById("parcel")
        var query = layer.createQuery();
        query.where = "FULL_ADDRE LIKE '%"+result1.result.feature.attributes.StAddr+"%'";
        layer.queryFeatures(query).then(result=>{
          console.log(result);
          // setQuery(result.features[0]);
          let layer2 = props.map.findLayerById("subdistrict");
          let layer3 = props.map.findLayerById("ur")
          let layer4 = props.map.findLayerById("neighborhood")

          let feature = result.features[0]
          query = layer2.createQuery();
          query.geometry = feature.geometry.centroid
          layer2.queryFeatures(query).then(result=>{
            
            feature.attributes.zoning_subdistrict = result.features[0].attributes.ZONE_;
           
            query = layer4.createQuery();
            query.geometry = feature.geometry.centroid

            layer4.queryFeatures(query).then(result=>{
            
              feature.attributes.neighborhood = result.features[0].attributes.Name;
              query = layer3.createQuery();
              query.geometry = feature.geometry.centroid
              layer3.queryFeatures(query).then(result=>{
  
                if(result.features.length != 0){
                  feature.attributes.ur_area = result.features[0].attributes.NAME;
                  setQuery(feature);
                }else{
                  setQuery(feature);
                }
                
  
            });
            
            })

            

          })
        });

      })
      props.view.ui.add(searchWidget, "top-right");

    })
    },[]);
    useEffect(()=>{
      loadModules([
        "esri/Graphic","esri/layers/FeatureLayer"
      ]).then(([Graphic,FeatureLayer]) => {
        const layer = new FeatureLayer({
          url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0",
          renderer:{
            type: "simple",  // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
              color: [ 128, 128, 128, 0.7],
              outline: {  // autocasts as new SimpleLineSymbol()
                width: 1,
                color: "lightblue"
              }
            }
          }
        });

        props.map.layers.add(layer);

        props.view.popup.on("trigger-action", function(event) {

          if (event.action.id === "sumbit") {
            console.log(props.view.graphics.items[0]);


            const promise = layer.applyEdits({
              addFeatures: [props.view.graphics.items[0]]
            });
            promise.then(result =>{
              console.log(props.view.graphics.items[0].attributes.pid)
              history.push("/parcel/" + props.view.graphics.items[0].attributes.pid);
              window.location.reload()
            })

          }
        });


      });

    },[])
    return null;
  }

  return (
    <div>
      <Dialog  fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.reducerState.dialogOpen} className={classes.dialog} >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Create BOLD Parcel
        </DialogTitle>
        <DialogContent dividers>
              <Map
                mapProperties={{ basemap: 'gray-vector' }}
                viewProperties={{
                      center: [-71.0589, 42.3601],
                      zoom: 16
                  }}>
              <Layer/>

              </Map>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    reducerState: state
  }
}

export default connect(
  mapStateToProps,
)(ProjectCreateDialog)
