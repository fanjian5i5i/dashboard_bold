import React from 'react';
import {Pie} from 'react-chartjs-2';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import { connect, useDispatch, useSelector  } from 'react-redux';
const data = {
	labels: [
		'Available',
		'Hold',
		'Conveyed'
	],
	datasets: [{
		data: [120, 50, 20],
		backgroundColor: [
			'#36A2EB',
			'#FFCE56',
			'#FF6384'
		],
		hoverBackgroundColor: [
			'#36A2EB',
			'#FFCE56',
			'#FF6384'
		]
	}]
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
  function getStyles(status, statuses, theme) {
    return {
      fontWeight:
        statuses.indexOf(status) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function PieChart(props){
	console.log(props)
	const classes = useStyles();
	const theme = useTheme();
	const [checked, setChecked] = React.useState(false);
	const [status, setStatus] = React.useState([]);
	  const [selected, setSelected] = React.useState([]);
	  const [data, setData] = React.useState([]);
	//   React.useEffect(()=>{
	// 	console.log(props.data)
	// 	setData({labels:getFieldValues(data,props.fieldName),
	// 		datasets:{data:processData(props.data)}});
		
	//   },[data])

	React.useEffect(() => {
		const fetchData = async () => {
		  const result = await axios(
			"http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/BOLD/FeatureServer/query?layerDefs={'layerId':'0','where':'1=1'}&returnGeometry=false&f=json",
		  );
		  setData(processData(result.data.layers[0].features));
		};
		fetchData();
	  }, []);
	


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
		let numbers = [];
		let labels = [];
		let colors = [];
		let arr = getFieldValues(data,props.fieldName);
		arr.forEach(field=>{
		  let parcels = 0;
		  data.forEach(record=>{
			if(field == record.attributes[props.fieldName]){
					parcels += 1;
				  } 
		  });
		  labels.push(field)
		  numbers.push(parcels);
		  colors.push(getRandomColor())
		});
	
		return [labels,numbers,colors]
	  }

	  const statuses = getFieldValues(props.data,"projectstatus");


	  const options ={
		title: {
		  display: false,
		},
		layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 0
            }
		},
		legend: {
            display: true,
            labels: {
                // fontColor: 'rgb(255, 99, 132)'
			},
			position:'left'
        }
}
	  
    return (
        <div className={classes.root}>
      <Paper className={classes.paper}>
        
      <Toolbar >
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Chart by {props.name}
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
        <Pie data={{"labels":data[0],"datasets":[{data:data[1],backgroundColor:data[2]}]}} options={options}/>
		</Paper>
		</div>
      
    )
}

const mapStateToProps = (state) => {
	return {
	  reducerState: state
	}
  }
  
  export default connect(
	mapStateToProps
  )(PieChart)