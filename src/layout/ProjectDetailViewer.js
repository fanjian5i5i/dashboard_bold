import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';

import { loadModules } from 'esri-loader';

const useStyles = makeStyles(theme => ({
  root1: {
    width: '100%',
    // maxWidth: 360,
    // maxHeight:500,
    overflowX:"auto",
    backgroundColor: theme.palette.background.paper,
  },
  root2: {
    width: '100%',
    // maxWidth: 360,
    maxHeight:300,
    overflowX:"auto",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius:3
  },
  spacer:{
    padding: theme.spacing(2),
  },
  list:{
    borderRadius:3,
    // maxHeight:350,
    overflowY:"auto"
  }
}));

export default function FolderList(props) {
  const classes = useStyles();
  const [data,setData] = useState([]);
  let lookup = {
    OBJECTID : "GIS Feature ID",
    pid : "Parcel ID",
    st_num: "Street Number",
    st_name: "Street Name",
    zipcode : "ZIP Code",
    ur_parcel_name : "UR Parcel",
    assessing_property_type : "Property Type",
    lot_size : "Lot Size",
    gross_area : "Built Sqft",
    living_area:"Living Area",
    land_value19 : "Land Value",
    building_value19 : "Building Value",
    total_value19 : "Total Value",
    neighborhood : "Neighborhood",
    owner : "Owner",
    current_use : "Current Use",
    zoning_subdistrict : "Zoning Subdistrict",
    notes : "Note",
    ur_area : "Urban Renewal Area",
    ur_number : "Urban Renewal Number",
    last_observed_date : "Last Observed",
    responsible_pm : "Project Manger",
    project_status : "Status",
    full_address : "Address",
    map_status : "Map Status",
    yardi_code : "Yardi Code",
    public_status: "Status"
  }


  let hidden = {
    OBJECTID : true,
    pid : false,
    st_num: true,
    st_name: true,
    zip_code : true,
    ur_parcel_name : true,
    assessing_property_type : false,
    lot_size : false,
    gross_area_19 : false,
    land_value_19 : false,
    building_value_19 : false,
    total_value_19 : false,
    living_area:true,
    neighborhood : false,
    owner : false,
    current_use : true,
    zoning_subdistrict : false,
    notes : false,
    ur_area : false,
    ur_number : false,
    last_observed_date : true,
    responsible_pm : true,
    project_status : true,
    full_address : false,
    map_status : true,
    yardi_id : false,
  }
  useEffect(()=>{
    loadModules(["esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([FeatureLayer,Query,StatisticDefinition]) => {
      const layer = new FeatureLayer({
        url: "https://gis.bostonplans.org/hosting/rest/services/Feature/BOLD/FeatureServer/0",
      });
      const query = new Query();
      query.where = "pid = '" + props.pid + "'";
      query.outFields = [ "*" ];
      query.returnGeometry = false;
      layer.queryFeatures(query).then(function(results){
        console.log(results.features);
        // dispatch(updateData(results.features))
        // dispatch(createOriginal(results.features));
        // setData(results.features);
        // setAProject(results.features.length)

        setData(results.features[0].attributes)


      });



    });
  },[])


  return (
    <div>
    <div className={classes.root1}>
    <Paper className={classes.paper}>
    <List className={classes.list}>


      <ListItem>
          <ListItemText primary={lookup.pid}/>
          <ListItemSecondaryAction>
              {data.pid}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.full_address}/>
          <ListItemSecondaryAction>
              {data.full_address}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.zipcode}/>
          <ListItemSecondaryAction>
              {data.zipcode}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.neighborhood}/>
          <ListItemSecondaryAction>
              {data.neighborhood}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.zoning_subdistrict}/>
          <ListItemSecondaryAction>
              {data.zoning_subdistrict}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.ur_area}/>
          <ListItemSecondaryAction>
              {data.ur_area}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.ur_number}/>
          <ListItemSecondaryAction>
              {data.ur_number}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.owner}/>
          <ListItemSecondaryAction>
              {data.owner}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.lot_size}/>
          <ListItemSecondaryAction>
              {data.lot_size?data.lot_size.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " Sqft.":'' }
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.gross_area}/>
          <ListItemSecondaryAction>
              {data.gross_area?data.gross_area.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):''}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.ur_parcel_name}/>
          <ListItemSecondaryAction>
              {data.ur_parcel_name}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.public_status}/>
          <ListItemSecondaryAction>
              {data.public_status}
              </ListItemSecondaryAction>
          </ListItem>
    </List>
    </Paper>
    </div>
    </div>

  );
}
