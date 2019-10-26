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
import MostRecentImg from '../assets/img/most_recent.jpg';
import Pie from '../components/charts/Pie';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
const useStyles = makeStyles({
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 200,
  },
  actions:{
    color:"grey"
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
    
        <CardContent>
          <Pie/>
          
          <Typography variant="body2" color="textSecondary" component="p">
            Sample Pie Chart
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider/>
      <CardActions className={classes.actions}>
      <BusinessOutlinedIcon/>
        <Typography variant="caption" gutterBottom>
         
         Total: 189
        </Typography>
      </CardActions>
    </Card>
  );
}
