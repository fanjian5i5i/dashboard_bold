import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';
import Input from '@material-ui/core/Input';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { loadModules } from 'esri-loader';
import {
  useHistory
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root1: {
    width: '100%',
    // maxWidth: 360,
    maxHeight:500,
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
    borderRadius:3,
    maxHeight:500,
    overflowX:"auto",
  },
  card: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius:3,
    marginBottom:theme.spacing(2),
  },
  spacer:{
    padding: theme.spacing(2),
  },
  list:{
    borderRadius:3,
    // maxHeight:350,
    overflowY:"auto"
  },
  button:{
    color:"white",
    backgroundColor:"#ef5350",
    margin:theme.spacing(2),
    "&:hover": {
      background: "#c23333"
    },
  }
}));

export default function FolderList(props) {
  const classes = useStyles();
  const [edit, setEdit] = useState("");
  const [status,setStatus] = useState("");
  const [currentUse, setCurrentUse] = useState("");
  const [data,setData] = useState([]);
  const [layer, setLayer] = useState(null);
  const [feature, setFeature] = useState(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  let history = useHistory();
  let lookup = {
    OBJECTID : "GIS Feature ID",
    pid : "Parcel ID",
    st_num: "Street Number",
    st_name: "Street Name",
    zipcode : "ZIP code",
    ur_parcel_name : "UR Parcel",
    assessing_property_type : "Property Type",
    lot_size : "Lot Size",
    gross_area : "Built SF",
    living_area:"Living Area",
    land_value19 : "Land Value",
    building_value19 : "Building Value",
    total_value19 : "Total Value",
    neighborhood : "Neighborhood",
    owner : "Owner",
    current_use : "Current Use",
    zoning_subdistrict : "Subdistrict",
    notes : "Note",
    ur_area : "UR Area",
    ur_number : "UR Number",
    last_observed_date : "Last Observed",
    responsible_pm : "Project Manger",
    project_status : "Status",
    full_address : "Address",
    map_status : "Map Status",
    yardi_code : "Yardi Code",
  }

  let statuses = [
    "Not developable",
    "Developable",
    "Long Term Maintenance Agreement",
    "Performing Asset",
    "Designated",
    "Ground Leased",
    "Conveyed"
  ];

  let uses = [
    "Marine Industrial",
    "Vacant",
    "Municipal",
    "Commercial",
    "Open Space",
    "Residential",
    "Parking",
    "Mixed Use",
    "Industrial",
    "Community Garden"
  ]

  let editable = {
    OBJECTID : false,
    pid : false,
    st_num: false,
    st_name: false,
    zip_code : false,
    ur_parcel_name : true,
    assessing_property_type : false,
    lot_size : false,
    gross_area_19 : false,
    land_value_19 : false,
    building_value_19 : false,
    total_value_19 : false,
    neighborhood : false,
    owner : false,
    current_use : true,
    zoning_subdistrict : false,
    notes : true,
    ur_area : false,
    ur_number : false,
    last_observed_date : false,
    responsible_pm : false,
    project_status : true,
    full_address : false,
    map_status : true,
    yardi_id : true,
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
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0",
      });

      setLayer(layer)
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
        setFeature(results.features[0])
        setCurrentUse(results.features[0].attributes.current_use)
        setStatus(results.features[0].attributes.project_status)

      });



    });
  },[])
  const handleClick = (fieldName) =>{
    console.log(fieldName);
    console.log(data);
    console.log(value)
    
    if(editable[fieldName]){
      setEdit(fieldName);
      setValue(data[fieldName])
    }

  }
  const handleChange = (e) =>{
    console.log(e.target.value);
    setValue(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = () =>{
    console.log(data);
    loadModules([
     "esri/layers/FeatureLayer"
    ]).then(([FeatureLayer]) => {
      const layer = new FeatureLayer({
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0",
      });
      var query = layer.createQuery();
      query.where = "pid = '"+data.pid+"'";
      layer.queryFeatures(query).then(result=>{
        console.log(result);
        const promise = layer.applyEdits({
          deleteFeatures : result.features
        });
        promise.then(result =>{
          console.log(result)
          // console.log(props.view.graphics.items[0].attributes.pid)
          history.push("/parcel");
          window.location.reload()
        })
      })
    // const promise = layer.applyEdits({
    //   deleteFeatures : [props.view.graphics.items[0]]
    // });
    

    })
    // setValue(e.target.value)
  }

  const handleSelectChange = (e) =>{
    // setEdit("")
    console.log(e.target.value);
    // setUse(e.target.value);
    let temp = feature;
    temp.attributes[edit] = e.target.value;
    updateFeature(temp);

  }


  const handleUseChange = (e) =>{
    console.log(e.target.value);
    setCurrentUse(e.target.value);
    let temp = feature;
    temp.attributes["current_use"] = e.target.value;
    updateFeature(temp);
  }


  const handleStatusChange = (e) =>{
    console.log(e.target.value);
    setStatus(e.target.value);
    let temp = feature;
    temp.attributes["project_status"] = e.target.value;
    updateFeature(temp);
  }

  const updateFeature  = (f) =>{
    const promise = layer.applyEdits({
      updateFeatures: [f]
    });
    promise.then(result =>{
      console.log(result);
      setValue("")
      setData(f.attributes)
    })
  }
   const handleClickSubmit = () =>{
    setEdit("")
      // console.log(layer);
      // console.log(feature);
      // console.log(value)
      let temp = feature;
      temp.attributes[edit] = value;
      console.log(temp);
      updateFeature(temp);
  }

  const handleClickAway = (e)=>{
    setEdit("")
  }

  const handleKeyDown = (e) =>{
    if(e.keyCode == 13){
      setEdit("");
      let temp = feature;
      feature.attributes[edit] = value;
      console.log(temp)
      updateFeature(temp)
    }
    if(e.keyCode == 27){
      setEdit("")
    }
  }

  // //
  // <ListItem key={index} >
  // <ListItemText primary={lookup[field]}  style={{"height":150}}/>
  // <ListItemSecondaryAction onClick={()=>handleClick(field)} style={{"paddingLeft":50}}>{field}</ListItemSecondaryAction>

  // </ListItem>

  // <Input
  //                     placeholder={data[field]?data[field].toString():""}
  //                     onChange={handleChange}
  //                     onKeyDown={handleKeyDown}
  //                     endAdornment={
  //                       <InputAdornment position="end">
  //                         <IconButton
  //                           aria-label="submit"
  //                           onClick={handleClickSubmit}
  //                           onMouseDown={handleClickSubmit}
  //                         >
  //                           <CheckIcon />
  //                         </IconButton>
  //                       </InputAdornment>
  //                     }/>

  return (
    <div>
    <Card className={classes.card}>
    <CardContent className={classes.root2}>
    <List className={classes.list} component="nav" dense={true}
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        Editable Fields
      </ListSubheader>
    }>
      <ListItem button onClick={()=>handleClick("ur_parcel_name")}>
        <ListItemText primary="UR Parcel"/>
          {edit==="ur_parcel_name"?
          <Input
          // placeholder={data["ur_parcel_name"]?data["ur_parcel_name"].toString():""}
          // value={data["ur_parcel_name"]?data["ur_parcel_name"].toString():""}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="submit"
                onClick={handleClickSubmit}
                onMouseDown={handleClickSubmit}
              >
                <CheckIcon />
              </IconButton>
            </InputAdornment>
          }/>:
          data["ur_parcel_name"]}

      </ListItem>
      <ListItem button>
        <ListItemText primary="Current Use"/>
          <Select
          id="mutiple-checkbox"
          value={currentUse}
          onChange={handleUseChange}
        >
          {uses.map(item => (
            <MenuItem key={item} value={item}>{item}
            </MenuItem>
          ))}
        </Select>
      </ListItem>
      <ListItem button>
        <ListItemText primary="Status"/>
          <Select
          id="mutiple-checkbox"
          value={status}
          onChange={handleStatusChange}
        >
          {statuses.map(item => (
            <MenuItem key={item} value={item}>{item}
            </MenuItem>
          ))}
        </Select>
      </ListItem>
      <ListItem button onClick={()=>handleClick("yardi_id")}>
        <ListItemText primary="Yardi Code"/>
        {edit==="yardi_id"?
          <Input
          // placeholder={data["yardi_id"]?data["yardi_id"].toString():""}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="submit"
                onClick={handleClickSubmit}
                onMouseDown={handleClickSubmit}
              >
                <CheckIcon />
              </IconButton>
            </InputAdornment>
          }/>:
          data["yardi_id"]}
      </ListItem>
      <ListItem button onClick={()=>handleClick("notes")}>
        <ListItemText primary="Notes" style={{"height":150}}/>
        {edit==="notes"?
          <TextField
          multiline
          // placeholder={data["notes"]?data["notes"].toString():""}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="submit"
                onClick={handleClickSubmit}
                onMouseDown={handleClickSubmit}
              >
                <CheckIcon />
              </IconButton>
            </InputAdornment>
          }/>:
          data["notes"]}
      </ListItem>

    </List>
    </CardContent>
    <CardActions>
        <Button 
        size="middle" 
        variant="contained"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={()=>handleClickOpen()}>
          
          Delete Parcel
          </Button>
      </CardActions>
    </Card>
   
    <Paper className={classes.paper}>
    <List className={classes.list}
     dense={true}
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        Non Editable Fields
      </ListSubheader>
     
    }>



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
              {data.lot_size}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.gross_area}/>
          <ListItemSecondaryAction>
              {data.gross_area}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.land_value19}/>
          <ListItemSecondaryAction>
              {data.land_value19}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.building_value19}/>
          <ListItemSecondaryAction>
              {data.building_value19}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.total_value19}/>
          <ListItemSecondaryAction>
              {data.total_value19}
              </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
          <ListItemText primary={lookup.assessing_property_type}/>
          <ListItemSecondaryAction>
              {data.assessing_property_type}
              </ListItemSecondaryAction>
          </ListItem>
      {
      //  data!={} ? data.map((field,index) =>


      //         !editable[field] && !hidden[field]?
      //         <ListItem key={index}>

      //           <ListItemText primary={lookup[field]}/>
      //           <ListItemSecondaryAction>
      //                 {data[field]}
      //             </ListItemSecondaryAction>

      //         </ListItem>:""
      //       ):""
      }

    </List>
    </Paper>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete parcel {data.pid}</DialogTitle>
        <DialogActions>
          <Button onClick={()=>handleDelete()}
           variant="contained"
            className={classes.button}>
            Delete
          </Button>
          <Button onClick={handleClose} color="default" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}
