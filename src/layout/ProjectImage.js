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
    backgroundSize: "contain"
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
  const [img, setImg] = useState([]);
  const [count, setCount] = useState(null)
  useEffect(() => {

    axios.get('http://localhost:8000/api/images/get/'+props.pid).then(result=>{
        setImg(result.data);
        setCount(result.data.length)
    })
    
  },[]);

  const uploadToBox = (e) =>{
      e.preventDefault();
      console.log(props.fields);
      const data = new FormData();
      data.append('file', fileInput.current.files[0]);
      data.append("fields",[props.fields[11].value,props.fields[36].value,props.fields[34].value]);
      axios.post('http://localhost:8000/api/images/',
      data,
      {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }).then((response)=>{
        console.log(response)
        // setImg(...img,response.data)
        let imgs = img;
        imgs.push(response.data);
        let temp = count + 1;
        setCount(temp);
        setImg(imgs)
      }).catch(err=>{
        console.log(err) 
      })
  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
      
      <CardMedia
          className={classes.media}
          image={img[0]}
          title="Contemplative Reptile"
        />
      
        
      </CardActionArea>

      <CardActions>
        <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            ref={fileInput}
            onChange={uploadToBox}
            type="file"
        />
        <label htmlFor="contained-button-file"  className={classes.actionBtn}>
            <Button component="span" variant="outlined" color="primary" >
            Add
            </Button>
        </label>
        <Badge color="primary" badgeContent={count} className={classes.margin}>
        <ProjectImageDialog img={img} pid={props?props.pid:""}/>
 
        </Badge>

      </CardActions>
    </Card>
  );
}