import React, {useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

import ProjectImageDialog from './ProjectImageDialog';
import axios from 'axios';
const useStyles = makeStyles(theme =>({
  card: {

  },
  media: {
    height: 350,
    backgroundSize: "cover"
  },
  margin: {
    margin: theme.spacing(1),
  },
  actionBtn:{
    marginLeft: 'auto',
  },
  input: {
    display: 'none',
    marginLeft: 'auto',
  },
}));

export default function ProjectImage(props) {
  const classes = useStyles();
  const fileInput = useRef(null);
  const [img, setImg] = useState(["https://via.placeholder.com/760x500.png?text=No%20Picture%20Avaliable"]);
  const [count, setCount] = useState(null);
  const [open, setOpen] = useState(null);
  const handleOpen = () =>{
    console.log("open")
    setOpen(!open)
  }
  useEffect(() => {

    axios.get('https://sire.bostonplans.org/api/images/get/'+props.pid).then(result=>{
        setImg(result.data);
        setCount(result.data.length)
    })
    .catch(err=>{
      console.log(err) 
    })
    
  },[]);
  return (
    <div onClick={handleOpen}>
      <Badge badgeContent={4} color="primary">
      <CardMedia
          className={classes.media}
          image={img[0]}
          title="Click to expand"
          
        />
</Badge>
      <ProjectImageDialog img={img} pid={props?props.pid:""} open={open}/>
      </div>

  );
}