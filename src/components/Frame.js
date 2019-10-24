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
import { withAuth } from '@okta/okta-react';
import Appbar from './Appbar';
import logo from '../assets/img/logo.png';
import PieChart from './charts/Pie';


import { connect } from 'react-redux';
import { taggleMobileOpen } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux'

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
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [user, setUser] = React.useState()
  const handleDrawerToggle = () => {
    // setMobileOpen(!mobileOpen);
    // dispatch(())
    
  };
  const mobileOpen = useSelector(state => state.mobileOpen)


  const checkUser = async () => {
    let authUser = await props.auth.getUser();
    if (authUser) {
      setUser(authUser);
    }
  }

  useEffect(()=>{
    checkUser()
  },[user])
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    
    console.log(user);
  };

  const drawer = (
    <ThemeProvider theme={themeList}>
      <div className={classes.toolbar}>
        <img src={logo} className={classes.logo}/>
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
            <ListItemText primary={"Table"} />
          </ListItem>
      </List>
    </ThemeProvider>
  );
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
        <PieChart/>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
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

