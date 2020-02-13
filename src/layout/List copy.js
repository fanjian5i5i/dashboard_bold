import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { changeTitle,changeLayout,updateDisplay } from '../redux/actions';
import { connect,useDispatch } from 'react-redux';
import { loadModules } from 'esri-loader';
import {
  useHistory 
} from "react-router-dom";
const useStyles = makeStyles({
  root: {
    // width: '100%',
    // overflowX: 'auto',
    overflowX: "hidden" 
  },
  table: {
    // minWidth: 650,
  },
  title:{
    background:" linear-gradient(60deg, #194F61, #003c50)",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(	0, 60, 80,.4)",
    borderRadius:3,
    position:"absolute",
    padding:15,
    top:35,
    color:"white"
  }
});
const columns = [
  {
    name: "pid",
    label: "PID",
    options: {
     filter: false,
     sort: false
    }
   },
   {
    name: "name",
    label: "Address",
    options: {
     filter: false,
     sort: false,
     display:true,
     sortDirection:'asc'
    }
   },
   "Neighborhood", "UR Area",
   {
    name: "lot_size",
    label: "Lot Size",
    options: {
     filter: false,
     sort: false,
     display:true,
    //  sortDirection:'asc'
    }
   },
   "Use","Status"];

 function SimpleTable(props) {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [full, setFull] = React.useState([]);
  const [display, setDisplay] = React.useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick =(rowData)=>{
    console.log(rowData);
    dispatch(changeTitle(rowData[0]))
    history.push("/project/"+rowData[0])
  }
  const handleChange = (action, tableState) => {
    console.log(tableState.displayData)
    let result = []
    tableState.displayData.forEach(record=>{
      result.push(record.data[0])
    })
    setDisplay(result)
    // dispatch(updateDisplay(result));
  }
  const handleDownload = (buildHead, buildBody, columns, toDownload) =>{
    console.log(display)
    let pids = [];
    props.reducerState.display.forEach(record=>{
      pids.push(record[0])
    })
    let filtered = full.filter(record=>  pids.indexOf(record.pid)>-1)
    return false;
  }
  // React.useEffect(() => {
  //   axios.get("http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_RE_parcels/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json")
  //   .then(results =>{
  //     // setData(result.data.layers[0].features);
  //     let result = []
  //     results.data.layers[0].features.forEach(record=>{
  //       if(record.attributes.project_status != "Conveyed" && record.attributes.project_status != null)
  //       result.push([record.attributes.pid,
  //         record.attributes.full_address,
  //         record.attributes.neighborhood,
  //         record.attributes.ur_number,
  //         record.attributes.lot_size,
  //         record.attributes.current_use,
  //         record.attributes.project_status,
  //       ])
  //     });
  //     setData(result)

  //   })
  // },[]);
  React.useEffect(()=>{
    console.log(props.reducerState.layout)
    dispatch(changeLayout("project"));
  },[props.reducerState.layout])

  React.useEffect(()=>{
    

    
    loadModules(["esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([FeatureLayer,Query,StatisticDefinition]) => {
      const layer = new FeatureLayer({
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0",
      });
      const query = new Query();
      query.where = "project_status <> 'Conveyed' ";
      query.outFields = [ "*" ];
      query.returnGeometry = false;
      layer.queryFeatures(query).then(function(results){
        // setFullData(results.features)
        // console.log(results.features);  
        // dispatch(updateData(results.features))
        // dispatch(createOriginal(results.features));
        // setData(results.features);
        // setAProject(results.features.length)
        let result = [];
        let fullArr = [];

        results.features.forEach(record=>{
          fullArr.push(record.attributes);
          result.push([record.attributes.pid,
            record.attributes.full_address,
            record.attributes.neighborhood,
            record.attributes.ur_number,
            record.attributes.lot_size,
            record.attributes.current_use,
            record.attributes.project_status,
          ])
        })
        setFull(fullArr);
        setData(result);
        console.log(fullArr)
        


      });


      
    });
  },[])
  const options = {
    // responsive: "scrollFullHeight",
    selectableRows:"none",
    filter:true,
    filterType: "dropdown",
    onRowClick:handleClick,
    onDownload:(buildHead, buildBody, columns, toDownload) =>{
      console.log(props)
      let pids = [];
      props.reducerState.display.forEach(record=>{
        pids.push(record[0])
      })
      let filtered = full.filter(record=>  pids.indexOf(record.pid)>-1)
      return false;
    },

    onTableChange:(action, tableState) => {
      console.log(tableState.displayData)
      let result = [];
      tableState.displayData.forEach(record=>{
        result.push(record.data[0])
      });
      console.log(result)
      // setDisplay(result)
      dispatch(updateDisplay(result));
    },
    elevation:2,
    responsive: "scrollMaxHeight",
    textLabels:{
      pagination: {
        rowsPerPage: "Rows:",
      }
    },
    // maxHeight:'none'
  };
  return (
    
        <MUIDataTable
          title={""}
          data={data}
          columns={columns}
          options={options}
        />
  );
}


const mapStateToProps = (state /*, ownProps*/) => {
  return {
    reducerState: state
  }
}

export default connect(
  mapStateToProps,
)(SimpleTable)