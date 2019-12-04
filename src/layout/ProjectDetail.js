import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    maxHeight:700,
    overflowX:"auto",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius:3
  },
  list:{
    borderRadius:3,
    // maxHeight:350,
    overflowY:"auto"
  }
}));

export default function FolderList(props) {
  const classes = useStyles();
  const [fields, setFields] = React.useState([]);
  // console.log(props)
  // useEffect(()=>{
  //   let fields = [];
  //   for (var key in props.project) {
  //     if (props.project.hasOwnProperty(key)) {
  //         let temp = {};
  //         // temp[key] = props.project[key]
  //         temp.fieldName = key;
  //         temp.value = props.project[key]
  //         // console.log(key + " -> " + p[key]);
  //         fields.push(temp)
  //     }
  //   }

  //   setFields(fields)
  // },[fields])
  return (
    <div className={classes.root}>
    <Paper className={classes.paper}>
    <List className={classes.list}>
      {
       props.fields.length>0 ? props.fields.map((field) => 
          field.fieldName!="notes"?
          <ListItem key={field.fieldName}>
            <ListItemText primary={field.fieldName}  />
            <ListItemSecondaryAction>{field.value}</ListItemSecondaryAction>
          </ListItem>:
          <ListItem key={field.fieldName} >
          <ListItemText primary={field.fieldName}  style={{"height":150}}/>
          <ListItemSecondaryAction style={{"paddingLeft":50}}>{field.value}</ListItemSecondaryAction>
        </ListItem>
        ):""
      }
      
      
    </List>
    </Paper>
    </div>
  );
}