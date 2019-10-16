import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, createMuiTheme,ThemeProvider  } from '@material-ui/core/styles';


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
    backgroundColor:"white",
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
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));




function Appbar(props) {
    const { container } = props;
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const handleMenu = () => {
        setMobileOpen(!mobileOpen);
      };
    

    const appbar = (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
     
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
                {auth && (
                    <div>
                    <IconButton aria-label="show 4 new mails" color="primary">
                        <MailIcon />
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="primary">
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="primary">
                        <AccountCircle />
                    </IconButton>
                </div>
                
                
                )}
                
            </div>
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
  
  export default Appbar;