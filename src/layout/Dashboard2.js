import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PieChart from '../components/charts/Pie';
import NeighborhoodChart from './NeighborhoodChart';
import RecentProject from './RecentProject';
import StatusChart from './StatusChart';
import Area from './Area';
import GrossArea from './GrossArea';
import AvailableProjects from './AvailableProjects';
import Value from './Value';
import NeighborhoodTable from './NeighborhoodTable';
import { placeholder } from '@babel/types';
import HomeIcon from '@material-ui/icons/Home';
import { loadModules } from 'esri-loader';
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
  { id: 'lotsize', numeric: true, disablePadding: false, label: 'Total Lot Size(sqft)' },
  { id: 'totalvalue', numeric: true, disablePadding: false, label: 'Total Assessment($)' },
  { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },

];

const useTableHead = [
  { id: 'use', numeric: false, disablePadding: true, label: 'Current Use' },
  { id: 'lot_size', numeric: true, disablePadding: false, label: 'Total Lot Size(sqft)' },
  { id: 'total_value_19', numeric: true, disablePadding: false, label: 'Total Assessment($)' },
  { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },

];
const urTableHead = [
  { id: 'ur', numeric: false, disablePadding: true, label: 'Urban Renewal Number' },
  { id: 'lot_size', numeric: true, disablePadding: false, label: 'Total Lot Size(sqft)' },
  { id: 'total_value_19', numeric: true, disablePadding: false, label: 'Total Assessment($)' },
  { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },

];

const statusTableHead  = [
  { id: 'projectstatus', numeric: false, disablePadding: true, label: 'Project Status' },
  { id: 'lot_size', numeric: true, disablePadding: false, label: 'Total Lot Size(sqft)' },
  { id: 'total_value_19', numeric: true, disablePadding: false, label: 'Total Assessment($)' },
  { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },

];


export default function AutoGrid() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [area, setArea] = React.useState(0);
  const [grossArea, setGrossArea] = React.useState(0);

  const [aProjects,setAProject] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    loadModules(["esri/layers/FeatureLayer","esri/tasks/support/Query","esri/tasks/support/StatisticDefinition"]).then(([FeatureLayer,Query,StatisticDefinition]) => {
      const layer = new FeatureLayer({
        url: "https://gis.bostonplans.org/hosting/rest/services/Feature/BOLD/FeatureServer/0",
      });
      const query = new Query();
      // query.where = "total_value_19 > 0";
      var sumValue = {
        onStatisticField: "total_value_19",
        outStatisticFieldName: "total_value_19_sum",
        statisticType: "sum"
      }
      query.where = "project_status <> 'Conveyed'"
      query.outStatistics = [ sumValue ];
      query.returnGeometry = false;
      layer.queryFeatures(query).then(function(results){
        console.log(results.features);
              setValue(results.features[0].attributes.total_value_19_sum);


              var sumArea = {
                onStatisticField: "lot_size",  // service field for 2015 population
                outStatisticFieldName: "lot_size_sum",
                statisticType: "sum"
              }
              query.outStatistics = [ sumArea ];

              layer.queryFeatures(query).then(function(results){
                console.log(results.features);
                      setArea(results.features[0].attributes.lot_size_sum);
                      var sumGrossArea = {
                        onStatisticField: "gross_area",  // service field for 2015 population
                        outStatisticFieldName: "gross_area_sum",
                        statisticType: "sum"
                      }
                      query.outStatistics = [ sumGrossArea ];

                      layer.queryFeatures(query).then(function(results){
                        console.log(results.features);
                              setGrossArea(results.features[0].attributes.gross_area_sum);





                      });




              });
      });



    });
  },[])







  React.useEffect(()=>{
    loadModules(["esri/layers/FeatureLayer","esri/tasks/support/Query","esri/tasks/support/StatisticDefinition"]).then(([FeatureLayer,Query,StatisticDefinition]) => {
      const layer = new FeatureLayer({
        url: "https://gis.bostonplans.org/hosting/rest/services/Feature/BOLD/FeatureServer/0",
      });
      const query = new Query();
      query.where = "project_status <> 'Conveyed' ";
      query.outFields = [ "*" ];
      query.returnGeometry = false;
      layer.queryFeatures(query).then(function(results){
        // console.log(results.features);

          dispatch(updateData(results.features))
          dispatch(createOriginal(results.features));
          setData(results.features);
          setAProject(results.features.length)
        
      });



    });
  },[])




  // React.useEffect(() => {
  //   axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json")
  //   .then(result =>{
  //     dispatch(updateData(result.data.layers[0].features))
  //     dispatch(createOriginal(result.data.layers[0].features));
  //     setData(result.data.layers[0].features);
  //   })
  // },[]);
//<Placeholder/>
/* <Grid item xs={12} md={6} lg={6}>
<RecentProject/>
</Grid> */


// <Grid item xs={12} md={6} lg={6}>
// <PieChart tableHeads={neighborhoodTableHead} name={"Neighborhoods"} fieldName={"neighborhood"} data={data}/>
// </Grid>
  return (
    <div className={classes.root}>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Area area={area}/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <GrossArea grossArea={grossArea}/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AvailableProjects aProjects={aProjects}/>
        </Grid>


        <Grid item xs={12} md={12} lg={12}>
          <NeighborhoodTable name={"Neighborhoods"} fieldName={"neighborhood"} data={data}/>
        </Grid>




      </Grid>

    </div>
  );
}
