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
}));

const columns = ["Neighborhoods","# Parcels", "Lot Size", "Commercial ", "Residential", "Assessed Value($)"];

const data = [
 ["South End","18", "1,000,000", "400,000", "900,000","5,000,000"],
 ["Dorchester","24", "1,000,000", "600,000", "800,000","6,000,000"],
 ["Downtown","36", "1,000,000", "800,000", "600,000","7,000,000"],
 ["Allston","48", "1,000,000", "900,000", "400,000","8,000,000"],
 ["East Boston","56", "1,000,000", "1,200,000", "200,000","10,000,000"],
];

const options = {
  filter: true,
  elevation:1
};

export default function ListView() {
  const classes = useStyles();
  return (
    <MUIDataTable 
      title={"Bold Projects By Neighborhoods"} 
      data={data} 
      columns={columns} 
      options={options} 
    />
  );
}