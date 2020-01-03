import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';
import Input from '@material-ui/core/Input';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { loadModules } from 'esri-loader';

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
  const [edit, setEdit] = useState("");
  const [use,setUse] = useState("");
  const [fields, setFields] = useState([]);
  const [data,setData] = useState([]);
  const [layer, setLayer] = useState(null);
  const [feature, setFeature] = useState(null);
  const [value, setValue] = useState("")
  let lookup = {
    OBJECTID : "GIS Feature ID",
    pid : "Parcel ID",
    st_num: "Street Number",
    st_name: "Street Name",
    zip_code : "ZIP code",
    ur_parcel_name : "UR Parcel",
    assessing_property_type : "Property Type",
    lot_size : "Lot Size",
    gross_area_19 : "Gross Area",
    land_value_19 : "Land Value",
    building_value_19 : "Building Value",
    total_value_19 : "Total Value",
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
    "Designated",
    "Available to Develop",
    "Long Term Hold",
    "Performing Asset",
    "Ground Leased",
    "License",
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
    yardi_code : true,
  }
  useEffect(()=>{
    loadModules(["esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([FeatureLayer,Query,StatisticDefinition]) => {
      const layer = new FeatureLayer({
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_RE_parcels/FeatureServer/0",
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


      });


      
    });
  },[])
  const handleClick = (fieldName) =>{
    console.log(fieldName)
    if(editable[fieldName]){
      setEdit(fieldName)
    }
    
  }
  const handleChange = (e) =>{
    console.log(e.target.value);
    setValue(e.target.value)
  }

  const handleSelectChange = (e) =>{
    setEdit("")
    console.log(e.target.value);
    // setUse(e.target.value);
    let temp = feature;
    temp.attributes[edit] = e.target.value;
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
    <div className={classes.root2}>
    <Paper className={classes.paper}>
    <List className={classes.list} component="nav"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        Editable Fields
      </ListSubheader>
    }>
      <ListItem button onClick={()=>handleClick("ur_parcel_name")}>
        <ListItemText primary="UR Parcel"/>
          {edit==="ur_parcel_name"?
          <Input 
          placeholder={data["ur_parcel_name"]?data["ur_parcel_name"].toString():""} 
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
      <ListItem button onClick={()=>handleClick("current_use")}>
        <ListItemText primary="Current Use"/>
        {edit==="current_use"?
        <ClickAwayListener onClickAway={handleClickAway}>
          <Select
          id="mutiple-checkbox"
          value={""}
          onChange={handleSelectChange}
        >
          {uses.map(item => (
            <MenuItem key={item} value={item}>{item}
            </MenuItem>
          ))}
        </Select>
        </ClickAwayListener>:
          data["current_use"]}
      </ListItem>
      <ListItem button onClick={()=>handleClick("project_status")}>
        <ListItemText primary="Status"/>

        {edit==="project_status"?
        <ClickAwayListener onClickAway={handleClickAway}>
          <Select
          id="mutiple-checkbox"
          value={""}
          onChange={handleSelectChange}
        >
          {statuses.map(item => (
            <MenuItem key={item} value={item}>{item}
            </MenuItem>
          ))}
        </Select>
        </ClickAwayListener>:
          data["project_status"]}

      </ListItem>
      <ListItem button onClick={()=>handleClick("map_status")}>
        <ListItemText primary="Map Status"/>
        
        {edit==="map_status"?
        <ClickAwayListener onClickAway={handleClickAway}>
          <Select
          id="mutiple-checkbox"
          value={""}
          onChange={handleSelectChange}
        >
            <MenuItem value={"Available"}>Available
            </MenuItem>
            <MenuItem value={"Not Available"}> Not Available
            </MenuItem>
          
        </Select>
        </ClickAwayListener>:
          data["map_status"]}

      </ListItem>
      <ListItem button onClick={()=>handleClick("yardi_code")}>
        <ListItemText primary="Yardi Code"/>
        {edit==="yardi_code"?
          <Input 
          placeholder={data["yardi_code"]?data["yardi_code"].toString():""} 
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
          data["yardi_code"]}
      </ListItem>
      <ListItem button onClick={()=>handleClick("notes")}>
        <ListItemText primary="Notes" style={{"height":150}}/>
        {edit==="notes"?
          <TextField 
          multiline
          placeholder={data["notes"]?data["notes"].toString():""} 
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
    </Paper>
    </div>
    <div className={classes.spacer}/>
    <div className={classes.root1}>
    <Paper className={classes.paper}>
    <List className={classes.list}
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        Non Editable Fields
      </ListSubheader>
    }>
      {
       data!={} ? Object.keys(data).map((field,index) => 
        

              !editable[field]?
              <ListItem key={index}>
                
                <ListItemText primary={lookup[field]}/>
                <ListItemSecondaryAction>
                      {data[field]}  
                  </ListItemSecondaryAction>

              </ListItem>:""
            ):""
      }
      
    </List>
    </Paper>
    </div>
    </div>

  );
}