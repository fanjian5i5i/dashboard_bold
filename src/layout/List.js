import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable,{ MTableToolbar } from 'material-table'
import Chip from '@material-ui/core/Chip';
import { changeTitle,changeLayout,updateDisplay } from '../redux/actions';
import { connect,useDispatch } from 'react-redux';
import { loadModules } from 'esri-loader';
import { ExportToCsv } from 'export-to-csv';
import {
  useLocation
} from "react-router-dom";
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

const lookups = {
  status:{
      "Developable":1,
      'Not developable':2,
      'Long-term maintenance agreement':3,
      'Performing Asset':4,
      'Designated':5,
      'Ground Leased':6,
      'Conveyed':7
  },
  neighborhood:{
    "East Boston":0,
    "Charlestown":1,
    "Charlestown: Navy Yard":2,
    "West End":3,
    "Downtown":4,
    "North End":5,
    "Chinatown":6,
    "South End":7,
    "Roxbury":8,
    "Back Bay":9,
     "South Boston Waterfront: RLFMP":10,
     "Mission Hill":11,
     "Dorchester":12,
     "Mattapan":13,
     "Hyde Park":14,
     "Roslindale":15,
     "West Roxbury":16
  },
  use:{
      "Marine Industrial":1,
      "Vacant":2,
      "Parking":3,
      "Municipal":4,
      "Commercial":5,
      "Open Space":6,
      "Residential":7,
      "Parking ":8,
      "Mixed Use":9,
      "Industrial":10,
      "Community Garden":11
  },
  ur_area:{
    null:0,
    "Charlestown":1,
    "North Station":2,
    "Government Center":3,
    "CBD-School-Franklin":4,
    "Downtown Waterfront/Faneuil Hall":5,
    "CBD-South Station":6,
    "Park Plaza":7,
    "South Cove":8,
    "South End":9,
    "Fenway":10,
    "South End ":11,
    "South Cove`":12,
    "SWC":13,
    "Kittredge Square":14,
    "Washington Park":15,
    "Campus High School":16,
    "Brunswick-King":17
  }

}
const columns = [
  {
    field: "pid",
    title: "PID",
   },
   {
    field: "full_address",
    title: "Address",
   },
   {
    field: "neighborhood",
    title: "Neighborhood",
    lookup:{
      0: "East Boston",
      1: "Charlestown",
      2: "Charlestown: Navy Yard",
      3: "West End",
      4: "Downtown",
      5: "North End",
      6: "Chinatown",
      7: "South End",
      8: "Roxbury",
      9: "Back Bay",
      10: "South Boston Waterfront: RLFMP",
      11: "Mission Hill",
      12: "Dorchester",
      13: "Mattapan",
      14: "Hyde Park",
      15: "Roslindale",
      16: "West Roxbury",
    }
   },
   {
    field: "ur_area",
    title: "Urban Renewal",
    lookup:{


      0: "Non Urban Renewal Area",
      1: "Charlestown",
      2: "North Station",
      3: "Government Center",
      4: "CBD-School-Franklin",
      5: "Downtown Waterfront/Faneuil Hall",
      6: "CBD-South Station",
      7: "Park Plaza",
      8: "South Cove",
      9: "South End",
      10: "Fenway",
      11: "South End",
      12: "South Cove",
      13: "SWC",
      14: "Kittredge Square",
      15: "Washington Park",
      16: "Campus High School",
      17: "Brunswick-King"
    }
   },
   {
    field: "lot_size",
    title: "Lot Size",
    filtering:false
   },
   {
    field: "current_use",
    title: "Use",
    lookup:{
      1: "Marine Industrial",
      2: "Vacant",
      3: "Parking",
      4: "Municipal",
      5: "Commercial",
      6: "Open Space",
      7: "Residential",
      8: "Parking ",
      9: "Mixed Use",
      10: "Industrial",
      11: "Community Garden"
    }
   },
   {
    field: "project_status",
    title: "Status",
    lookup:{
      1:"Developable",
      2:'Not Developable',
      3:'Long Term Maintenance Agreement',
      4:'Performing Asset',
      5:'Designated',
      6:'Ground Leased',
      7:'Conveyed'
    }
  }
   ];
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
 function SimpleTable(props) {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [full, setFull] = React.useState([]);
  const [filters, setFilters] = React.useState(null);
  
  const [display, setDisplay] = React.useState([]);
  const history = useHistory();
  
  const dispatch = useDispatch();
  let urlQuery = useQuery();
  const handleClick =(rowData)=>{
    console.log(rowData);
    dispatch(changeTitle(rowData[0]))
    history.push("/parcel/"+rowData[0])
  }
  const handleDelete = (e) =>{
    // console.log(e)
    setFilters("0");
    history.push('/parcel?filters=0')
    loadModules(["esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([FeatureLayer,Query,StatisticDefinition]) => {
      const layer = new FeatureLayer({
        url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0",
      });
      const query = new Query();
      query.where = "project_status <> 'Conveyed'";
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
          let temp = record.attributes;

          delete temp.st_name;
          delete temp.st_num;
          delete temp.living_area;
          delete temp.last_observed_date;
          delete temp.responsible_pm;
          delete temp.map_status;
          temp.build_sf = temp.gross_area;
          delete temp.gross_area;
          fullArr.push(temp);
          if(record.attributes.current_use == "Marine Industrial"){
            console.log(record)
          }
          result.push({
            pid:record.attributes.pid,
            full_address:record.attributes.full_address,
            neighborhood:lookups.neighborhood[record.attributes.neighborhood],
            ur_area:lookups.ur_area[record.attributes.ur_area],
            lot_size:record.attributes.lot_size,
            current_use:lookups.use[record.attributes.current_use],
            project_status:lookups.status[record.attributes.project_status],
          })
        })
        setFull(fullArr);
        setData(result);
        console.log(fullArr)



      });



    });
  
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
    dispatch(changeLayout("parcel"));
  },[props.reducerState.layout])

  React.useEffect(()=>{
    setFilters(urlQuery.get("filters"))
    // console.log(urlQuery.get("filters"))
  },[filters])
  React.useEffect(()=>{
    

    if(filters){
      console.log(filters)
      loadModules(["esri/layers/FeatureLayer","esri/tasks/support/Query"]).then(([FeatureLayer,Query,StatisticDefinition]) => {
        const layer = new FeatureLayer({
          url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/BOLD_parcels_RE/FeatureServer/0",
        });
        const query = new Query();
        
        query.where = filters != "0" ? "project_status <> 'Conveyed' AND neighborhood = '"+filters+"'" : "project_status <> 'Conveyed'";
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
            let temp = record.attributes;
  
            delete temp.st_name;
            delete temp.st_num;
            delete temp.living_area;
            delete temp.last_observed_date;
            delete temp.responsible_pm;
            delete temp.map_status;
            temp.build_sf = temp.gross_area;
            delete temp.gross_area;
            fullArr.push(temp);
            if(record.attributes.current_use == "Marine Industrial"){
              console.log(record)
            }
            result.push({
              pid:record.attributes.pid,
              full_address:record.attributes.full_address,
              neighborhood:lookups.neighborhood[record.attributes.neighborhood],
              ur_area:lookups.ur_area[record.attributes.ur_area],
              lot_size:record.attributes.lot_size,
              current_use:lookups.use[record.attributes.current_use],
              project_status:lookups.status[record.attributes.project_status],
            })
          })
          setFull(fullArr);
          setData(result);
          console.log(fullArr)
  
  
  
        });
  
  
  
      });
    }

  },[filters])
  return (

    <div style={{ maxWidth: '100%' }}>
    <MaterialTable
        title=""
        // columns={[
        //   { title: 'Name', field: 'name' },
        //   { title: 'Surname', field: 'surname' },
        //   { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        //   {
        //     title: 'Birth Place',
        //     field: 'birthCity',
        //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        //   },
        // ]}
        isLoading={data.length == 0 ? true : false}
        columns={columns}
        data={data}
        components={{
          Toolbar: props => (
              <>
                  <MTableToolbar {...props} />
                  {
                    filters && filters!="0"?<div style={{padding: '0px 10px'}}>
                    <Chip label={filters} color="primary" style={{marginRight: 5}} onDelete={handleDelete}/>
                  </div>:""}
              </>
          )
      }}
        onRowClick = {(event,rowData) =>{
          console.log(rowData);
          dispatch(changeTitle(rowData.pid))
        // history.push("/parcel/"+rowData.pid)
          window.open("/parcel/"+rowData.pid, '_blank');
        }   }
        
        options={{
          filtering: true,
          exportButton:true,
          exportAllData:true,
          pageSize:10,
          exportCsv: (columns, data) => {
            // alert('You should develop a code to export ' + data.length + ' rows');
            console.log(data);
            console.log(full);
            let pids = [];
            data.forEach(record=>{
              pids.push(record.pid)
            })
            let filtered = full.filter(record=>  pids.indexOf(record.pid)>-1);
            console.log(filtered);
            const options = {
              fieldSeparator: ',',
              quoteStrings: '"',
              decimalSeparator: '.',
              showLabels: true,
              showTitle: false,
              title: 'bold',
              useTextFile: false,
              useBom: true,
              useKeysAsHeaders: true,
              // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
            };
            const csvExporter = new ExportToCsv(options);
            csvExporter.generateCsv(filtered);
          }
        }}
      />
  </div>
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