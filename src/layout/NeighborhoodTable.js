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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';

import { connect, useDispatch, useSelector  } from 'react-redux';
import { updateData } from '../redux/actions';


import axios from 'axios';

const createData = (neighborhood, lot_size, parcels ) => {
  return { neighborhood, lot_size, parcels };
}

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

const headCells = [
  { id: 'neighborhood', numeric: false, disablePadding: true, label: 'Neighborhood' },
  { id: 'lot_size', numeric: true, disablePadding: false, label: 'Total Lot Size (sqft)' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Total Assessed Value' },
  { id: 'commercial', numeric: true, disablePadding: false, label: 'Total Commercial (sqft)' },
  { id: 'residential', numeric: true, disablePadding: false, label: 'Total Residential (sqft)' },
  { id: 'parcels', numeric: true, disablePadding: false, label: 'No. of Parcels' },

];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
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

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  formControl:{
    minWidth:150,
    marginBottom:theme.spacing(2)
  },
  
  paper:{
    padding:theme.spacing(2)
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
  
  const [status, setStatus] = React.useState([]);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStautsChange = event => {
    setStatus(event.target.value);
  };

  const handleChange = event =>{
    setChecked(!checked)
  }
  const handleSumbit = event =>{
    console.log("submit");
    console.log(props)
    let result = []
    // axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={layerId:0,where:projectstatus='Available'}&returnGeometry=false&f=json")
    // .then(result =>{
    //   dispatch(updateData(result.data.layers[0].features))

    // })
    let temp = props.data;
    temp.forEach(record =>{

      if(record.attributes.projectstatus == "Available"){
        console.log(record)
        result.push(record)
      }
    })
    console.log(result)
    dispatch(updateData(result))

  }
  
  
  const statuses = ["Available","Not Available","Leased"];

  function getStyles(status, statuses, theme) {
    return {
      fontWeight:
        statuses.indexOf(status) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  return (
    <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Parcels by Neighborhoods
        </Typography>
        
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
          
        </Tooltip>
        <Popover
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Card className={classes.card}>
            <CardHeader
            title="Filters"
            />
            <CardContent  className={classes.paper}>
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    value="checked"
                   
                  />
                }
                label="BRA Owned"
              />
            </FormControl>
            
            </CardContent>

            <CardActions>
              <Button fullWidth onClick={handleSumbit}>Submit</Button>
            </CardActions>
            </Card>
          </Popover>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
  },
}));

function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('parcels');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = React.useState([{"neighborhood":"loading"}]);

  const getNeighborhoods = (items) =>{
    var lookup = {};
    var items = items;
    var result = [];
  
    for (var item, i = 0; item = items[i++];) {
      var name = item.attributes.neighborhood;
    
      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(name);
      }
    }
    return result
   }
  React.useEffect(() => {
    axios.get("http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json")
    .then(result =>{
      dispatch(updateData(result.data.layers[0].features))

    })
  },[]);

  React.useEffect(()=>{
    let results = [];
    let temp = props.reducerState.data;
    
    // if(temp.length >= 0){
      let neighborhoodArr = getNeighborhoods(temp);
      neighborhoodArr.forEach(neighborhood=>{
        let parcels = 0;
        let lot_size = 0;
        let value = 0;
        temp.forEach(field=>{
          if(neighborhood == field.attributes.neighborhood){
                  parcels += 1;
                  lot_size += field.attributes.lot_size;
                  value += field.attributes.land_value;
                } 
        });
        results.push({neighborhood,parcels,lot_size,value})
  
      });
      setData(results);
    // }
    // setData(results);
    
    // console.log(props.reducerState.data)
    // const counter = useSelector(state => state.counter)
    // setData(props.reducerState.data)


    
  },[props.reducerState.data])
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
  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar data={props.reducerState.data}/>
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
                      key={row.neighborhood}
                    >
                      <TableCell component="th" scope="row">
                        {row.neighborhood}
                      </TableCell>
                      <TableCell align="right">{row.lot_size}</TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                      <TableCell align="right">{Math.floor(Math.random()*10000000)}</TableCell>
                      <TableCell align="right">{Math.floor(Math.random()*10000000)}</TableCell>
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