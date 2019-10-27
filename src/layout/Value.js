import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import MostRecentImg from '../assets/img/most_recent.jpg';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import AssessmentIcon from '@material-ui/icons/Assessment';
const useStyles = makeStyles({
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 200,
  },
  actions:{
    color:"grey"
  },
  icon:{
    fontSize:120,
    color:"white"
    // textAlign:"center"
  },
  paper:{
    
    background:" linear-gradient(60deg, #26c6da, #00acc1)",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)",
    textAlign:"center",
    margin: 15,
    marginBottom: 35,
    marginTop: 8,
    maxWidth: 150
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        
        <CardContent>
          <Paper className={classes.paper}>
          <AssessmentIcon className={classes.icon} />
          </Paper>
          
          <Typography variant="body2" color="textSecondary" component="p">
            Total Assessed Value: $100,000,000
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider/>
      <CardActions className={classes.actions}>
        <UpdateOutlinedIcon/>
        <Typography variant="caption"gutterBottom>
        Last updated: Aug 20 2019
        </Typography>
      </CardActions>
    </Card>
  );
}
