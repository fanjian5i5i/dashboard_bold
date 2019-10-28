import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MostRecentImg from '../assets/img/most_recent.jpg';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
const useStyles = makeStyles({
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 250,
  },
  actions:{
    color:"grey"
  },
  avatar: {
    backgroundColor: "#003c50",
  },
  title:{

    background:"linear-gradient(60deg, #66bb6a, #43a047)",
    color: "White",
    fontSize: 14,
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={MostRecentImg}
          title="811 MASSACHUSETTS AV"
        />
        <CardContent>
          <Typography variant="subtitle2" component="h2" color="Primary">
            Most Recent Project
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            811 Mass Ave
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider/>
      <CardActions className={classes.actions}>
        <UpdateOutlinedIcon/>
        <Typography variant="caption"gutterBottom>
        Last updated: Today
        </Typography>
      </CardActions>
    </Card>
  );
}
