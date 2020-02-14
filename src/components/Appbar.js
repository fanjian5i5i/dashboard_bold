import React ,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { withAuth } from '@okta/okta-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import Dialog from '../layout/ProjectCreateDialog';


import Link from '@material-ui/core/Link';
import { makeStyles, useTheme, createMuiTheme,ThemeProvider  } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { taggleMobileOpen } from '../redux/actions';
import { useDispatch } from 'react-redux'



const drawerWidth = 240;

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
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor:"#eee",
    borderWidth:0,
    boxShadow:"none"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  newProject:{
    color:"#003c50 !important"
  }
}));




function Appbar(props) {
    const { container } = props;
    const classes = useStyles();
    const [authenticated, setAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const regex = /(\b[a-z](?!\s))/g;
    const handleAdd = () =>{
      dispatch({ type: 'OPEN_DIALOG' })
    }
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
      taggleMobileOpen();
    };
    const handleMenu = () => {
        setMobileOpen(!mobileOpen);
        taggleMobileOpen();
      };

    const checkUser = async () => {
      let authUser = await props.auth.getUser();
      if (authUser) {
        console.log(authUser)
        setUser(authUser);
      }
    }

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      props.auth.logout()
    };

    useEffect(()=>{
      checkUser()
    },[])


    const appbar = (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={() => dispatch({ type: 'TAGGLE_MOBILE_OPEN' })}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="primary" href={"/"+props.reducerState.layout}>
                <strong>
              {props.reducerState.layout.replace(regex, function(x){return x.toUpperCase();})}
                </strong>
              </Link>
              {props.reducerState.title?
              <Link color="primary" href={"/parcel/"+props.reducerState.title+"/"}>

                  {props.reducerState.title}

              </Link>:""
              }
            </Breadcrumbs>

            <div className={classes.grow} />
            <div className={classes.sectionMobile}>

                    <Tooltip title="Add Parcels">
                      <IconButton aria-label="add" color="primary" onClick={() => dispatch({ type: 'OPEN_DIALOG' })}>
                        <NoteAddIcon />
                      </IconButton>
                    </Tooltip>


                    <Button color="primary">{user.name}</Button>
            </div>
            <div className={classes.sectionDesktop}>
                    <Button className={classes.newProject} disabled>create a parcel</Button>
                    <Tooltip title="Add a Parcel">
                      <IconButton aria-label="add" color="primary" onClick={() => dispatch({ type: 'OPEN_DIALOG' })}>
                        <NoteAddIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton aria-label="show 17 new notifications" color="primary">
                        <NotificationsIcon />
                    </IconButton>

                    <Button color="primary" onClick={handleClick}>{user.name}</Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>

            </div>
            <Dialog/>
            </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
    return appbar;
}

Appbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
  };


  const mapStateToProps = (state /*, ownProps*/) => {
    return {
      reducerState: state
    }
  }


  export default connect(
    mapStateToProps,
  )(withAuth(Appbar))
