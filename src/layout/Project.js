import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withAuth } from '@okta/okta-react';
import ProjectDetail from './ProjectDetail';
import ProjectDetailViewer from './ProjectDetailViewer';

import Map from './projectMap';
import { loadModules } from 'esri-loader';
import ProjectImage from './ProjectImage'
import { useDispatch  } from 'react-redux';

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

}));




let Project = (props)=> {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [user, setUser] = React.useState({"roles":"viewer"});
  const dispatch = useDispatch();
  let {pid} = useParams();
  React.useEffect(() => {

    dispatch(changeLayout("parcel"));
    dispatch(changeTitle(pid))
    // axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'ParcelID="+pid+"'}&returnGeometry=true&f=json")
    loadModules(['esri/Graphic',"esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([Graphic,FeatureLayer,Query]) => {
      const layer = new FeatureLayer({
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_RE_parcels/FeatureServer/0",
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

  React.useEffect(()=>{
    checkUser()
  },[])
  const checkUser = async () => {
    let authUser = await props.auth.getUser();
    if (authUser) {
      console.log(authUser)
      setUser(authUser);
    }
  }
//<Placeholder/>
  return (
  
    <div className={classes.root}>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>

          
          {
            user.roles ==="admin"? <ProjectDetail fields={fields} pid={pid}/> : <ProjectDetailViewer fields={fields} pid={pid}/>
          }
          


        </Grid>
        <Grid item xs={12} md={6} lg={6} container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>

              <ProjectImage pid={pid} fields={fields} roles={user.roles}/>

          </Grid>
          <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <Map pid={pid}/>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

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
)(withAuth(Project))
