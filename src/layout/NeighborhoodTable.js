import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider   } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { connect, useDispatch, useSelector  } from 'react-redux';
import { updateData, resetData, createOriginal } from '../redux/actions';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
// Hold for the meeting to happen

// { id: 'commercial', numeric: true, disablePadding: false, label: 'Total Commercial (sqft)' },
// { id: 'residential', numeric: true, disablePadding: false, label: 'Total Residential (sqft)' },
// <TableCell align="right">{Math.floor(Math.random()*10000000)}</TableCell>
// <TableCell align="right">{Math.floor(Math.random()*10000000)}</TableCell>
function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  const categories = {
    "neighborhood":"Neighborhoods",
    "current_use":"Current Use",
    "ur_area":"Urban Renewal Areas",
    "project_status":"Project Status"
  }
  const tableHead = [
    { id: 'neighborhood', numeric: false, disablePadding: true, label: 'Neighborhood' },
    { id: 'lotsize', numeric: true, disablePadding: false, label: 'Total Lot Size(sqft)' },
    { id: 'totalvalue', numeric: true, disablePadding: false, label: 'Total Assessed Value' },
    { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },
  
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align='left'
          sortDirection={orderBy === props.category ? order : false}
        >
          <TableSortLabel
              active={orderBy === props.category}
              direction={order}
              onClick={createSortHandler(props.category)}
            >

              {categories[props.category]}
              {orderBy === props.category ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
        </TableCell>
        <TableCell
          align='right'
          sortDirection={orderBy === "lotsize" ? order : false}
        >
          <TableSortLabel
              active={orderBy === props.category}
              direction={order}
              onClick={createSortHandler("lotsize")}
            >

              Total Lot Size(sqft)
              {orderBy === "lotsize" ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
        </TableCell>
        <TableCell
          align='right'
          sortDirection={orderBy === "totalvalue" ? order : false}
        >
          <TableSortLabel
              active={orderBy === props.category}
              direction={order}
              onClick={createSortHandler("totalvalue")}
            >

              Total Assessed Value($)
              {orderBy === "totalvalue" ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
        </TableCell>
        <TableCell
          align='right'
          sortDirection={orderBy === "parcels" ? order : false}
        >
          <TableSortLabel
              active={orderBy === props.category}
              direction={order}
              onClick={createSortHandler("parcels")}
            >

              No. of Parcels  
              {orderBy === "parcels" ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
        </TableCell>

        {/* {tableHeads.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))} */}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',

    paddingTop: theme.spacing(2)
  },
  grow:{
    flexGrow: 1,
    justifyContent:" flex-end"
  },
  title: {
    // flex: '1 1 100%',
    background:" linear-gradient(60deg, #194F61, #003c50)",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(	0, 60, 80,.4)",
    borderRadius:3,
    position:"absolute",
    padding:15,
    top:-15,
    color:"white"
  },
  titleForm:{
    marginLeft:theme.spacing(2),
    marginRight:theme.spacing(2),
    minWidth:150,
    marginBottom:theme.spacing(1),
  },
  titleSelect:{
    color:"white"
  },
  select:{
    maxWidth:250
  },
  formControl:{
    marginLeft:theme.spacing(2),
    marginRight:theme.spacing(2),
    minWidth:150,
    marginBottom:theme.spacing(2),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow:{
    paddingTop: "8px !important",
    paddingBottom: "8px !important",
    paddingLeft: "16px !important",
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));

function EnhancedTable(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('parcels');
  const [category, setCategory] = React.useState('neighborhood');
  const [selectedStatus, setSelectedStatus] = React.useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = React.useState([]);
  const [selectedUR, setSelectedUR] = React.useState([]);
  const [selectedUse, setSelectedUse] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [total, setTotal] = useState(0)
  const [data, setData] = React.useState([{"neighborhood":"loading"}]);
  const handleStautsChange = event => {

    setSelectedStatus(event.target.value);
  };
  const handleNeighborhoodsChange = event => {

    setSelectedNeighborhood(event.target.value);
  };
  const handleURChange = event => {

    setSelectedUR(event.target.value);
  };
  const handleUseChange = event => {

    setSelectedUse(event.target.value);
  };

  
  const handleCategoryChange = event => {
    setCategory(event.target.value);
    setData(processData(props.data,event.target.value));
  };

  const handleSubmit = event =>{
    console.log("submit");
    let tempArr = [];
    let dataArr = [];
    if(selectedStatus.length == 0){
      tempArr=props.reducerState.originalData;
    }else{
    props.reducerState.originalData.forEach(record =>{
        selectedStatus.forEach(status=>{
          if(record.attributes.project_status == status){
            tempArr.push(record)
          }
        })
    });
    }
    dataArr = tempArr;
    tempArr = [];
    if(selectedNeighborhood.length == 0){
      tempArr=dataArr
    }else{
    dataArr.forEach(record =>{
        selectedNeighborhood.forEach(neighborhood=>{
          if(record.attributes.neighborhood == neighborhood){
            tempArr.push(record)
          }
        })
      })
    }
    dataArr = tempArr;
    tempArr = [];

    if(selectedUse.length == 0){
      tempArr=dataArr
    }else{
    dataArr.forEach(record =>{
      selectedUse.forEach(use=>{
          if(record.attributes.current_use == use){
            tempArr.push(record)
          }
        })
      })
    }
    dataArr = tempArr;
    tempArr = [];


    if(selectedUR.length == 0){
      tempArr=dataArr
    }else{
    dataArr.forEach(record =>{
      selectedUR.forEach(ur=>{
          if(record.attributes.ur_area == ur){
            tempArr.push(record)
          }
        })
      })
    }
    dataArr = tempArr;
    console.log(dataArr);
    setData(processData(dataArr,category));
     
    // dispatch(updateData(result))

  }
  const getFieldValues = (items,fieldName) =>{
    var lookup = {};
    var items = items;
    var result = [];
  
    for (var item, i = 0; item = items[i++];) {
      var name = item.attributes[fieldName];
    
      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(name);
      }
    }
    return result
   }
  

  const processData = (data,fieldName) =>{
    let results = [];
    console.log(data);
    setTotal(data.length)
    let arr = getFieldValues(data,fieldName);
    arr.forEach(field=>{
      let parcels = 0;
      let lot_size = 0;
      let value = 0;
      data.forEach(record=>{
        if(field == record.attributes[fieldName]){
                parcels += 1;
                lot_size += record.attributes.lot_size;
                value += record.attributes.total_value_19;
              } 
      });
      results.push({field,parcels,lot_size,value});

    });

    return results
  }
  // React.useEffect(() => {
  //   axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json")
  //   .then(result =>{
  //     dispatch(updateData(result.data.layers[0].features))
  //     dispatch(createOriginal(result.data.layers[0].features))
  //   })
  // },[]);

  React.useEffect(()=>{
    console.log(props.data)
    setData(processData(props.data,props.fieldName));
    
  },[props.data])
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = event => {
  //   if (event.target.checked) {
  //     const newSelecteds = data.map(n => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const statuses = getFieldValues(props.data,"project_status");
  const neighborhoods = getFieldValues(props.data,"neighborhood");
  const urAreas = getFieldValues(props.data,"ur_area");
  const currentUses = getFieldValues(props.data,"current_use");
  console.log(currentUses)
  const categories = [
    {id:"neighborhood",name:"Neighborhoods"},
    {id:"current_use",name:"Current Use"},
    {id:"ur_area",name:"Urban Renewal Areas"},
    {id:"project_status",name:"Project Status"}
  ]

  function getStyles(selectedStatus, statuses, theme) {
    return {
      fontWeight:
        statuses.indexOf(selectedStatus) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        
      <Toolbar >
      
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Parcels by 
          <ThemeProvider theme={darkTheme}>
          <FormControl className={classes.titleForm}>
          
              <Select
                id="mutiple-checkbox"
                value={category}
                onChange={handleCategoryChange}
                className={classes.titleSelect}
              >
                {categories.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.name}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          </ThemeProvider>
        </Typography>
        
        </Toolbar>
        <Toolbar className={classes.grow}>
          <FormControl className={classes.formControl}>
            
              <InputLabel id="demo-mutiple-name-label">Project Statuses</InputLabel>
              <Select
                id="mutiple-checkbox"
                multiple
                value={selectedStatus}
                renderValue={selectedStatus => selectedStatus.join(', ')}
                onChange={handleStautsChange}
                className={classes.select}
                input={<Input />}
              >
                {statuses.map(name => (
                  <MenuItem key={name} value={name} style={getStyles(name, selectedStatus, theme)}>
                    <Checkbox checked={selectedStatus.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            
              <InputLabel id="neighborhood-mutiple-name-label">Neighborhoods</InputLabel>
              <Select
                id="mutiple-checkbox-neighborhood"
                multiple
                value={selectedNeighborhood}
                renderValue={selectedNeighborhood => selectedNeighborhood.join(', ')}
                onChange={handleNeighborhoodsChange}
                className={classes.select}
                input={<Input />}
              >
                {neighborhoods.map(name => (
                  <MenuItem key={name} value={name} style={getStyles(name, selectedNeighborhood, theme)}>
                    <Checkbox checked={selectedNeighborhood.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            
              <InputLabel id="use-mutiple-name-label">Current Use</InputLabel>
              <Select
                id="mutiple-checkbox-use"
                multiple
                value={selectedUse}
                renderValue={selectedUse => selectedUse.join(', ')}
                onChange={handleUseChange}
                className={classes.select}
                input={<Input />}
              >
                {currentUses.map(name => (
                  <MenuItem key={name} value={name} style={getStyles(name, selectedUse, theme)}>
                    <Checkbox checked={selectedUse.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            
              <InputLabel id="ur-mutiple-name-label">Urban Renewal</InputLabel>
              <Select
                id="mutiple-checkbox-ur"
                multiple
                value={selectedUR}
                renderValue={selectedUR => selectedUR.join(', ')}
                onChange={handleURChange}
                className={classes.select}
                input={<Input />}
              >
                {urAreas.map(name => (
                  <MenuItem key={name} value={name} style={getStyles(name, selectedUR, theme)}>
                    <Checkbox checked={selectedUR.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <Button variant="outlined"  onClick={handleSubmit} color="primary"><strong>Filter</strong></Button>

        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
            
          >
            <EnhancedTableHead
              classes={classes}
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              category={category}

            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell component="th" scope="row" className={classes.tableRow}>
                        {row.field}
                      </TableCell>
                      <TableCell align="right" className={classes.tableRow}>{row.lot_size?row.lot_size.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):""}</TableCell>
                      <TableCell align="right" className={classes.tableRow}>${row.value?row.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):""}</TableCell>

                      <TableCell align="right" className={classes.tableRow}>{row.parcels}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                <TableCell align="right" className={classes.tableRow}></TableCell>
                <TableCell align="right" className={classes.tableRow}></TableCell>
                <TableCell align="right" className={classes.tableRow}></TableCell>
                <TableCell align="right" className={classes.tableRow}>Total : {total}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    reducerState: state
  }
}

export default connect(
  mapStateToProps
)(EnhancedTable)