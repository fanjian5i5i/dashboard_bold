import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
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
   "Neighborhood", "UR Area", "Site","Lot Size","Use","Status"];

export default function SimpleTable() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const history = useHistory();
  const handleClick =(rowData)=>{
    console.log(rowData);
    history.push("/project/"+rowData[0])
  }
  React.useEffect(() => {
    axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json")
    .then(results =>{
      // setData(result.data.layers[0].features);
      let result = []
      results.data.layers[0].features.forEach(record=>{
        result.push([record.attributes.ParcelID,
          record.attributes.full_address,
          record.attributes.neighborhood,
          record.attributes.ur_number,
          record.attributes.site,
          record.attributes.lot_size,
          record.attributes.currentuse,
          record.attributes.projectstatus,
        ])
      });
      setData(result)

    })
  },[]);
  const options = {
    responsive: "scrollFullHeight",
    selectableRows:"none",
    filter:false,
    onRowClick:handleClick
  };
  return (
    <div>
      <Toolbar >
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Projects
        </Typography>
        </Toolbar>

        <MUIDataTable
          title={""}
          data={data}
          columns={columns}
          options={options}
        />

    </div>
  );
}