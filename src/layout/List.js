import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from "mui-datatables";
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
  map:{
    height:"80vh"
  }
}));

const columns = ["Name", "Company", "City", "State"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: 'checkbox',
};

export default function ListView() {
  const classes = useStyles();
  return (
    <MUIDataTable 
      title={"Employee List"} 
      data={data} 
      columns={columns} 
      options={options} 
    />
  );
}