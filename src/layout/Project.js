import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProjectDetailViewer from './ProjectDetailViewer';

import Map from './projectMap';
import { loadModules } from 'esri-loader';
import { useDispatch  } from 'react-redux';


//for public view, using card

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import ProjectImageDialog from './ProjectImageDialog';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";
import { connect } from 'react-redux';
import { changeTitle,changeLayout } from '../redux/actions';
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
  media: {
    height: 450,
    backgroundSize: "cover"
  },
}));




let Project = (props)=> {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [user, setUser] = useState({"roles":"viewer"});
  const [img, setImg] = useState(["https://via.placeholder.com/760x500.png?text=No%20Picture%20Avaliable"]);
  const [count, setCount] = useState(null);
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  let {pid} = useParams();
  useEffect(() => {

    axios.get('https://sire.bostonplans.org/api/images/get/'+pid).then(result=>{
        setImg(result.data);
        setCount(result.data.length)
    })
    .catch(err=>{
      console.log(err) 
    })
    
  },[]);
  const handleOpen = () =>{
    console.log("open")
    setOpen(!open)
  }
  React.useEffect(() => {

    dispatch(changeLayout("parcel"));
    dispatch(changeTitle(pid))
    // axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'ParcelID="+pid+"'}&returnGeometry=true&f=json")
    loadModules(['esri/Graphic',"esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([Graphic,FeatureLayer,Query]) => {
      const layer = new FeatureLayer({
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0",
      });
      const query = new Query();
      query.where = "pid = '"+pid+"'";
      query.returnGeometry = true;
      query.outFields = [ "*" ];


      layer.queryFeatures(query).then(function(results){
        console.log(results.features);  // prints the array of features to the console
              let fields = [];
              let tempProject = results.features[0].attributes;
              setData(tempProject);
              for (var key in tempProject) {
                if (tempProject.hasOwnProperty(key) && key!="OBJECTID") {

                    let temp = {};
                    // temp[key] = props.project[key]
                    temp.fieldName = key;
                    temp.value = tempProject[key]
                    // console.log(key + " -> " + p[key]);
                    fields.push(temp)
                }
              }

              setFields(fields)
      });
    });
  },[]);

//<Placeholder/>
  return (
  
    <div className={classes.root}>

      <Grid container spacing={2} justify="center" alignItems="center" direction="row" style={{paddingLeft:"30%",paddingRight:"30%"}}>
        <Grid item xs={12} md={6} lg={12} >
        <Badge color="primary" badgeContent={count} style={{width:"100%"}}>
        <Card className={classes.root} >
        
        <CardActionArea onClick={handleOpen}>
        
        <CardMedia
          className={classes.media}
          image={img[0]}
          title="Click to expand"
          
        />
        </CardActionArea>
        <CardContent style={{padding:0}}>
          <ProjectDetailViewer fields={fields} pid={pid}/>
          </CardContent>
        
        
        </Card>
        </Badge>
        </Grid>
          <Grid item xs={12} md={6} lg={12}>
          <Paper>
            <Map pid={pid}/>
            </Paper>
          </Grid>

      </Grid>
      <ProjectImageDialog img={img} pid={props?props.pid:""} handleOpen={handleOpen} open={open}/>
    </div>
  
  )
}


const mapStateToProps = (state /*, ownProps*/) => {
  return {
    reducerState: state
  }
}


export default connect(
  mapStateToProps,
)(Project)
