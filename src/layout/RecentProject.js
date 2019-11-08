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
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import MostRecentImg from '../assets/img/most_recent.jpg';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
const useStyles = makeStyles({
  card: {
    // maxWidth: 345,
    // display: 'flex',
    overflow:"initial",
    marginTop:15
    // flexDirection: 'column',
  },
  details: {
    display: 'flex',
    flexWrap: "wrap"
    // flexDirection: 'column',
    
  },
  media: {
    width:"50%",
    minHeight:230
  },
  actions:{
    color:"grey",
    flex: '1 1 auto',
  
  },
  avatar: {
    backgroundColor: "#003c50",
  },
  title:{
    top: -30,
    color: "white",
    padding: 15,
    position: "absolute",
    background: "linear-gradient(60deg, #194F61, #003c50)",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba( 0, 60, 80,.4)",
    borderRadius: 3,
  },
  content: {
    flex: '1 0 auto',
    width:"50%"
  },
  listIcon:{
    minWidth:100
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
      
        <CardContent className={classes.content}>
          <Toolbar>
          <Typography component="h6" variant="h6" className={classes.title}>
           Most Recent Project
          </Typography>
          </Toolbar>
          <List component="nav">
          <ListItem button>
            <ListItemIcon className={classes.listIcon}>
                    PID
            </ListItemIcon>
            <ListItemText primary="0800900050" />
          </ListItem>
          <ListItem button>
              <ListItemIcon className={classes.listIcon}>
                    Neighborhood
                  </ListItemIcon>
            <ListItemText primary="Roxbury" />
          </ListItem>
          <ListItem button>
          <ListItemIcon className={classes.listIcon}>
                    Status
                  </ListItemIcon>
            <ListItemText primary="Not Avaliable" />
          </ListItem>
          <ListItem button>
          <ListItemIcon className={classes.listIcon}>
                    Owner
                  </ListItemIcon>
            <ListItemText primary="Boston Redevelopment Authority" />
          </ListItem>
          </List>
        </CardContent>
        <CardMedia
        className={classes.media}
        image={"https://bold.bostonplans.org/api/image/f7e87c3f70ac879cfaa143d0b601dc5c.jpg"}
        title="Live from space album cover"
      />
      
    </div>
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
