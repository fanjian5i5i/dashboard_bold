import React ,{useEffect}from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import MapIcon from '@material-ui/icons/Map';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import Appbar from './Appbar';
import logo from '../assets/img/logo.png';
import Dashboard2 from '../layout/Dashboard2';
import Project from '../layout/Project';
import Map from '../layout/Map';
import ListView from '../layout/List';
import NeighborhoodTable from '../layout/NeighborhoodTable';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { taggleMobileOpen,changeLayout,changeTitle } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";

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
const themeList = createMuiTheme({
  palette: {
    primary: {
        main:"#003c50"
    },
    secondary:{
        main:"#ffffff"
    }
  },
  overrides: {
    // Style sheet name ⚛️
    MuiListItem: {
      // Name of the rule
      "root": {
        "&$selected": {
          "color": "white",
          "backgroundColor": "#00a6b4",
          // "background":"linear-gradient(45deg, #495657 10%, #00a6b4 70%)",
          "border-radius":"3px",
          "boxShadow": '0 3px 5px 2px rgba(0, 166, 180, .2)',
        },
        "&$selected:hover": {
          "color": "white",
          "backgroundColor": "#00a6b4"
        }
      }
    },
  },
});


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflow: "auto"
  },
  list:{
    padding:15
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:"#003c50",
    color:"white"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow:'auto'
  },
  logo:{
    height:50,
    top:10,
    left:10,
    position:"absolute"
  },
  sidebar:{
    // backgroundColor:"#003c50"
  }
}));


function Frame(props) {
  const { container } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0); //dashboard index
  const [user, setUser] = React.useState();
  const [authenticated, setAuthenticated] = React.useState(false);
  const [layout,setLayout] = React.useState("dashboard");
  useEffect(() => { 
    
    checkAuthentication()
   }, [authenticated] );


  const checkAuthentication = async () => {
    const isAuthenticated = await props.auth.isAuthenticated();
    if (isAuthenticated !== authenticated) {
      setAuthenticated(isAuthenticated);
    }
  }
  let { id } = useParams();
  let { path } = useRouteMatch();
  let history = useHistory();
  const handleDrawerToggle = () => {
    // setMobileOpen(!mobileOpen);
    // dispatch(())

  };
  const mobileOpen = useSelector(state => state.mobileOpen)


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    const indexArr = [
      "dashboard","map","parcel"
    ]
    setLayout(indexArr[index]);
    dispatch(changeLayout(indexArr[index]));

    dispatch(changeTitle(""));
    history.push("/"+indexArr[index]);

    // console.log(user);
  };

  const drawer = (
    <ThemeProvider theme={themeList} >
      <div className={classes.toolbar}>
        <img src={"http://www.bostonplans.org//images/assets/BPDA-MobileLogo.png?bpda"} className={classes.logo}/>
      </div>
      <Divider />
      <List className={classes.list}>
          <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
          >
            <ListItemIcon ><DashboardIcon color="secondary"/></ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)} >
            <ListItemIcon><MapIcon color="secondary"/></ListItemIcon>
            <ListItemText primary={"Map"} />
          </ListItem>
          <ListItem
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)} >
            <ListItemIcon><AssignmentIcon color="secondary"/></ListItemIcon>
            <ListItemText primary={"Parcels"} />
          </ListItem>
      </List>
    </ThemeProvider>
  );


  function renderLayout(id){
    
    switch (id) {
      case "dashboard":
          // handleListItemClick(null,0)

        return (
          <Dashboard2/>
        )
        break;
      case "map":
          // handleListItemClick(null,1)
        return <Map/>
          break;
      case "parcel":
          // handleListItemClick(null,2)
          console.log(id)
          return (
          <Switch>
            <Route exact path={path}>
              <ListView />
            </Route>
            <Route path={`${path}/:pid`}>
              <Project />
            </Route>
          </Switch>
          )

        break;
      default:
          // setSelectedIndex(0);
          return (
            <Dashboard2/>
          )
        break;
    }
  }

  useEffect(() => {
    // console.log('count changed', props.reducerState.layout);
    // switch(props.reducerState.layout){
    //   case "dashboard":
    //     handleListItemClick(0);
    //     break;
    //     case "map":
    //     handleListItemClick(1);
    //     break;
    //     case "project":
    //     handleListItemClick(2);
    //     break;
    //     default:
    //       break


    // }
    if(props.reducerState.layout!=layout){
      setLayout(props.reducerState.layout);
      switch(props.reducerState.layout){
        case "dashboard":
          setSelectedIndex(0);

          break;
        case "map":
          setSelectedIndex(1);
          break;
          case "parcel":
          setSelectedIndex(2);
          break;
          default:
          break;
      }

    }
}, [props.reducerState.layout])
  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <CssBaseline />
      <Appbar/>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={() => dispatch({ type: 'TAGGLE_MOBILE_OPEN' })}

            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {
        
        authenticated?
        renderLayout(id):
            <Redirect to={{ pathname: '/login' }}/>
        }
            
{/* {        <Switch>
          <Route exact path={path}>
            <Dashboard />
          </Route>
          <Route path='dashboard2'>
            <Dashboard2 />
          </Route>
          <Route path='map'>
            <Map />
          </Route>
          <Route path='project'>
            <ListView />
          </Route>
        </Switch>} */}
      </main>
    </div>
    </ThemeProvider>
  );
}

Frame.propTypes = {
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

const mapDispatchToProps = { taggleMobileOpen }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Frame))
