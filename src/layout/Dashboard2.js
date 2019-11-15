import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PieChart from '../components/charts/Pie';
import NeighborhoodChart from './NeighborhoodChart';
import RecentProject from './RecentProject';
import StatusChart from './StatusChart';
import Area from './Area';
import Placeholder from './Placeholder';
import Value from './Value';
import NeighborhoodTable from './NeighborhoodTable';
import { placeholder } from '@babel/types';
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch  } from 'react-redux';
import { updateData, resetData, createOriginal } from '../redux/actions';

import axios from 'axios';
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


const neighborhoodTableHead = [
  { id: 'neighborhood', numeric: false, disablePadding: true, label: 'Neighborhood' },
  { id: 'lot_size', numeric: true, disablePadding: false, label: 'Total Lot Size(sqft)' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Total Assessed Value($)' },
  { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },

];

const useTableHead = [
  { id: 'use', numeric: false, disablePadding: true, label: 'Current Use' },
  { id: 'lot_size', numeric: true, disablePadding: false, label: 'Total Lot Size(sqft)' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Total Assessed Value($)' },
  { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },

];
const urTableHead = [
  { id: 'ur', numeric: false, disablePadding: true, label: 'Urban Renewal Number' },
  { id: 'lot_size', numeric: true, disablePadding: false, label: 'Total Lot Size(sqft)' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Total Assessed Value($)' },
  { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },

];

const statusTableHead  = [
  { id: 'projectstatus', numeric: false, disablePadding: true, label: 'Project Status' },
  { id: 'lot_size', numeric: true, disablePadding: false, label: 'Total Lot Size(sqft)' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Total Assessed Value($)' },
  { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },

];


export default function AutoGrid() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json")
    .then(result =>{
      dispatch(updateData(result.data.layers[0].features))
      dispatch(createOriginal(result.data.layers[0].features));
      setData(result.data.layers[0].features);
    })
  },[]);
//<Placeholder/>
  return (
    <div className={classes.root}>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <Area/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Value/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <RecentProject/>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <NeighborhoodTable tableHeads={neighborhoodTableHead} name={"Neighborhoods"} fieldName={"neighborhood"} data={data}/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <NeighborhoodTable tableHeads={useTableHead} name={"Current Use"} fieldName={"currentuse"} data={data}/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <NeighborhoodTable tableHeads={urTableHead} name={"Urban Renewal Area"} fieldName={"ur_number"} data={data}/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <NeighborhoodTable tableHeads={statusTableHead} name={"Project Statuses"} fieldName={"projectstatus"} data={data}/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <PieChart tableHeads={neighborhoodTableHead} name={"Neighborhoods"} fieldName={"neighborhood"} data={data}/>
        </Grid>
        

        
      </Grid>
      
    </div>
  );
}