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
    useEffect(() => {
      loadModules([
        "esri/widgets/Search",
        "esri/Graphic",
        "esri/layers/FeatureLayer",
        "esri/tasks/support/Query"
    ]).then(([Search,Graphic,FeatureLayer,Query]) => {
        var searchWidget = new Search({
          view: props.view,
          popupEnabled:false
        });
        props.view.ui.add(searchWidget, "top-right");
        const layer = new FeatureLayer({
          // URL to the service
          url: "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/Parcels19WMFull/FeatureServer/0",
          // definitionExpression: "ParcelID = '"+props.pid+"'"
          outFields:["*"]
        });


        
        searchWidget.on("select-result",(result1)=>{
          console.log(result1.result.feature.attributes);
          layer.definitionExpression = "FULL_ADDRE LIKE '%"+result1.result.feature.attributes.StAddr+"%'"
          props.map.layers.add(layer);
          props.view.whenLayerView(layer).then(function(layerView) {
            layerView.watch("updating", function(value) {
              console.log(value)
              if (!value) {
                // wait for the layer view to finish updating
            
                // get all the features available for drawing.
                layerView
                  .queryFeatures({
                    geometry: props.view.extent,
                    returnGeometry: true,
                    outFields:layerView.availableFields
                  })
                  .then(function(results) {
                    // do something with the resulting graphics
                    // graphics = results.features;
                    console.log(results)
                    // setFeature(results.features[0].attributes.OBJECTID);
  
                    // if(feature != results.features[0].attributes.OBJECTID){
                    //   props.view.goTo({target:results.features[0].geometry});
                    // }
                    props.view.popup.open({
                      //   // Set the popup's title to the coordinates of the clicked location
                        title: results.features[0].attributes.PID_LONG,
                        location: results.features[0].geometry.centroid,// Set the location of the popup to the clicked location
                        content:
                          "<strong>Address</strong>: "+results.features[0].attributes.FULL_ADDRE +
                          "<br/> <strong>Owner</strong>: "+results.features[0].attributes.OWNER + 
                          "<br/> <strong>Land Use</strong>: "+results.features[0].attributes.LAND_USE +
                          "<br/> <strong>Building Value</strong>: "+results.features[0].attributes.AV_BLDG.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
                          "<br/> <strong>Land Value</strong>: "+results.features[0].attributes.AV_LAND.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
                          "<br/> <strong>Total Value</strong>: "+results.features[0].attributes.AV_TOTAL.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')  +
                          "<br/> <strong>Gross Area</strong>: "+results.features[0].attributes.LIVING_ARE.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') 
                      });
                  });
              }
            });
          });

          // props.view.popup.open({
          //   // Set the popup's title to the coordinates of the clicked location
          //   title: result1.result.feature.attributes.Match_addr,
          //   location: result1.result.feature.geometry// Set the location of the popup to the clicked location
          // });

          // axios.get("https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/Parcels19WMFull/FeatureServer/0/query?f=json&where=(FULL_ADDRE%20LIKE%20%27%25"+
          // result1.result.feature.attributes.StAddr
          // +"%25%27)%20AND%20(1=1)&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*")
          // .then(result2 =>{
          //   console.log(result2);
          //   if(result2.data.features.length>0){
              
          //     var graphic = new Graphic({
          //       geometry: {
          //         type:'polygon',
          //         rings:result2.data.features[0].geometry.rings
          //       },
          //       symbol: {
          //         type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
          //         color: "red",
          //         outline: {  // autocasts as new SimpleLineSymbol()
          //           color: [128, 128, 128, 0.5],
          //           width: "0.5px"
          //         }
          //       }
          //       // symbol: polylineSymbol,
          //     });
          //     console.log(graphic)
          //     props.view.graphics.add(graphic);
          //   }
          //   })
        })
  
      });
    });
    return null;
  }

  return (
    <div>
      <Dialog  fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.reducerState.dialogOpen} className={classes.dialog} >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Create BOLD project
        </DialogTitle>
        <DialogContent dividers>
            <Map 
              mapProperties={{ basemap: 'gray-vector' }} 
              viewProperties={{
                    center: [-71, 42],
                    zoom: 6
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