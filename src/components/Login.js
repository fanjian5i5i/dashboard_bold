// src/Home.js

import React, { useState, useEffect } from "react";
import { withAuth } from '@okta/okta-react';
import OktaAuth from '@okta/okta-auth-js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Hero from '../assets/img/login.jpg'
const theme = createMuiTheme({
    palette: {
      primary: {
          main:"#003c50"
      },
      secondary:{
          main:"#00a6b4"
      }
    },
  });
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/">
          BPDA
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: "url(" +Hero +")",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width:"100%",
      backgroundPosition: 'top',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "#00a6b4",
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default withAuth(
function Login(props) {
const classes = useStyles();
    
//   constructor(props) {
//     super(props);
//     this.state = { authenticated: null };
//     this.checkAuthentication = this.checkAuthentication.bind(this);
//     this.checkAuthentication();
//     this.login = this.login.bind(this);
//     this.logout = this.logout.bind(this);
//   }
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const oktaAuth = new OktaAuth({ url: props.baseUrl });

  const checkAuthentication = async () => {
    const isAuthenticated = await props.auth.isAuthenticated();
    if (isAuthenticated !== authenticated) {
      setAuthenticated(isAuthenticated);
    }
  }
  
  useEffect(() => { 
    
    checkAuthentication()
   }, [authenticated] );

   const handleSubmit = (e) => {
    e.preventDefault();

    oktaAuth.signIn({
      username:username,
      password:password
      // username:'jian.fan@boston.gov',
      // password:'Zhangyunqi5i5i!'

    })
    .then(res => {
      setSessionToken({
      sessionToken: res.sessionToken
      })
      
    })
    .catch(err => console.log('Found an error', err));
   }

   const handleUsernameChange = (e)=>{
    setUsername(e.target.value)
   }
   const handlePasswordChange = (e)=>{
    setPassword(e.target.value)
   }


  if (sessionToken) {

    props.auth.redirect(sessionToken);
    return null;
  }
return  authenticated ? 
        <Redirect to={{ pathname: '/dashboard' }}/> :
        (
    <ThemeProvider theme={theme}>
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Grid>
  </Grid>
  </ThemeProvider>
 )
 
}

);