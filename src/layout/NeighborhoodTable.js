import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles(theme =>({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  toolbar:{
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));
const columns = [
  {
  name: "id",
  label: "ID",
  options: {
   filter: false,
   sort: false,
  }
 },
 {
  name: "Parcel ID",
  label: "Parcel ID",
  options: {
  filter: false,
  sort: false,
 }},
 {
   name: "lot size",
    label: "Lot Size",
    options: {
    filter: false,
    sort: false,
  }}, 
  {
    name: "Assessed Value ($)",
     label: "Assessed Value ($)",
     options: {
     filter: false,
     sort: false,
   }}, 
  
  "Projects Status",
  "Neighborhood"];
const options = {
  filterType: 'dropdown',
};

export default function SimpleTable() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json")
    .then(result =>{
      console.log(result);
      let arr = []
      result.data.layers[0].features.forEach((record,index) => {
        arr.push([index,record.attributes.ParcelID,record.attributes.lot_size,record.attributes.land_value,record.attributes.projectstatus, record.attributes.neighborhood])
      })
      setData(arr)
    })
  },[]);
  {    
//   <Paper className={classes.root}>
//   <Toolbar
//    className={classes.toolbar}
//    >
//    <Typography className={classes.title} color="inherit" variant="subtitle1">
//      Neighborhoods Summary
//    </Typography>
//    <Tooltip title="Filter list">
//      <IconButton aria-label="filter list">
//        <FilterListIcon />
//      </IconButton>
//    </Tooltip>
//    </Toolbar>
//  <Table className={classes.table} aria-label="simple table">
//    <TableHead>
//      <TableRow>
//        <TableCell>ID</TableCell>
//        <TableCell>Parcel ID</TableCell>
//        <TableCell align="right">Neighborhood</TableCell>
//        <TableCell align="right">Lot Size&nbsp;(sqft)</TableCell>
//        <TableCell align="right">Current Use</TableCell>
//        <TableCell align="right">Assessed Value&nbsp;($)</TableCell>
//        <TableCell align="right">Projects Status</TableCell>.
       
//      </TableRow>
//    </TableHead>
//    <TableBody>
//      {data.map((row,index) => (
//        <TableRow key={row.attributes.OBJECTID}>
//          <TableCell>{index+1}</TableCell>
//          <TableCell component="th" scope="row">
//            {row.attributes.ParcelID}
//          </TableCell>
//          <TableCell align="right">{row.attributes.neighborhood}</TableCell>
//          <TableCell align="right">{row.attributes.lot_size}</TableCell>
//          <TableCell align="right">{row.attributes.currentuse}</TableCell>
//          <TableCell align="right">{parseInt(row.attributes.building_value)+parseInt(row.attributes.land_value)}</TableCell>
//          <TableCell align="right">{row.attributes.projectstatus}</TableCell>
//        </TableRow>
//      ))
//      }
//    </TableBody>
//  </Table>
// </Paper>
}
  return (
    <MUIDataTable
      title={"Data"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}