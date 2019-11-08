import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, useTheme  } from '@material-ui/core/styles';
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


// import axios from 'axios';

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
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.tableHeads.map(headCell => (
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
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
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
  formControl:{
    marginLeft:theme.spacing(2),
    marginRight:theme.spacing(2),
    minWidth:150,
    marginBottom:theme.spacing(2)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  tableWrapper: {
    overflowX: 'auto',
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
  const [checked, setChecked] = React.useState(false);

  const [status, setStatus] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [data, setData] = React.useState([{"neighborhood":"loading"}]);
  const handleStautsChange = event => {
    setStatus(event.target.value);
  };

  const handleCheck = event =>{
    setChecked(!checked)
  }
  const handleSumbit = event =>{
    console.log("submit");
    let result = []
    props.reducerState.originalData.forEach(record =>{
      status.forEach(s=>{

        if(record.attributes.projectstatus == s){

          if(checked){
            if(record.attributes.owner_1 ==  "Boston Redevelopment Authority" ){
              result.push(record)
            }
          }else{
              result.push(record)
          }
          
        }
      })
    })
    console.log(result);
    setData(processData(result));
     
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
  

  const processData = (data) =>{
    let results = [];
    let arr = getFieldValues(data,props.fieldName);
    arr.forEach(field=>{
      let parcels = 0;
      let lot_size = 0;
      let value = 0;
      data.forEach(record=>{
        if(field == record.attributes[props.fieldName]){
                parcels += 1;
                lot_size += record.attributes.lot_size;
                value += record.attributes.land_value;
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

    setData(processData(props.data));
    
  },[props.data])
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const statuses = getFieldValues(props.data,"projectstatus")

  function getStyles(status, statuses, theme) {
    return {
      fontWeight:
        statuses.indexOf(status) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        
      <Toolbar >
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Parcels by {props.name}
        </Typography>
        </Toolbar>
        <Toolbar className={classes.grow}>
        <FormControl className={classes.formControl}>
            
              <InputLabel id="demo-mutiple-name-label">Project Statuses</InputLabel>
              <Select
                id="mutiple-checkbox"
                multiple
                value={status}
                renderValue={selected => selected.join(', ')}
                onChange={handleStautsChange}
                input={<Input />}
              >
                {statuses.map(name => (
                  <MenuItem key={name} value={name} style={getStyles(name, status, theme)}>
                    <Checkbox checked={status.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
          </FormControl>

          <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleCheck}
                    value="checked"
                   
                  />
                }
                label="BRA Owned"
              />

            <Button variant="outlined"  onClick={handleSumbit} color="primary"><strong>Filter</strong></Button>

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
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              tableHeads={props.tableHeads}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell component="th" scope="row">
                        {row.field}
                      </TableCell>
                      <TableCell align="right">{row.lot_size?row.lot_size.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):""}</TableCell>
                      <TableCell align="right">{row.value?row.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):""}</TableCell>

                      <TableCell align="right">{row.parcels}</TableCell>
                    </TableRow>
                  );
                })}
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