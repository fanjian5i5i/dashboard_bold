import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { changeTitle } from '../redux/actions';
import { useDispatch  } from 'react-redux';
import {
  useHistory 
} from "react-router-dom";
const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
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
    label: "Name",
    options: {
     filter: false,
     sort: false,
     display:true,
     sortDirection:'asc'
    }
   },
   "Neighborhood", "UR Area","Lot Size","Use","Status"];

export default function SimpleTable() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick =(rowData)=>{
    console.log(rowData);
    dispatch(changeTitle(rowData[0]))
    history.push("/project/"+rowData[0])
  }
  React.useEffect(() => {
    axios.get("http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_RE_parcels/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json")
    .then(results =>{
      // setData(result.data.layers[0].features);
      let result = []
      results.data.layers[0].features.forEach(record=>{
        if(record.attributes.project_status != "Conveyed" && record.attributes.project_status != null)
        result.push([record.attributes.pid,
          record.attributes.full_address,
          record.attributes.neighborhood,
          record.attributes.ur_number,
          record.attributes.lot_size,
          record.attributes.current_use,
          record.attributes.project_status,
        ])
      });
      setData(result)

    })
  },[]);
  const options = {
    responsive: "scrollFullHeight",
    selectableRows:"none",
    filter:false,
    onRowClick:handleClick,
    elevation:2
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