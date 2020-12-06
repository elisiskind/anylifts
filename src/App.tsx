import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {NavigationDrawer} from "./components/NavigationDrawer";
import {
  AppBar,
  Box,
  createMuiTheme,
  createStyles,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  MuiThemeProvider,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Workout} from "./components/workout/Workout";
import {ProgramsView} from "./components/programs/ProgramsView";
import {Exercises} from "./components/Exercises";
import {Equipment} from "./components/Equipment";
import {Menu} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      background: theme.palette.grey["100"]
    },
  }),
);

export const AppTheme1 = {
  palette: {
    primary: {
      main: '#32373B',
    },
    secondary: {
      main: '#999AC6',
    },
    error: {
      main: '#DB5461'
    },
    warning: {
      main: '#F1D302'
    },
    info: {
      main: '#00B9AE'
    },
    success: {
      main: '#97DB4F'
    }
  }
};

export const AppTheme = {
  palette: {
    primary: {
      main: '#008C88',
    },
    secondary: {
      main: '#940063',
    },
    error: {
      main: '#DE432E'
    },
    warning: {
      main: '#FFA825'
    },
    info: {
      main: '#2D73E4'
    },
    success: {
      main: '#5ba100'
    }
  }
};

function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = createMuiTheme(AppTheme);

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Box className={classes.root}>
          <CssBaseline/>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <Menu/>
              </IconButton>
              <Typography variant="h6" noWrap>
                Bob Lifts
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <NavigationDrawer/>
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
                <NavigationDrawer/>
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Switch>
              <Route path="/workout">
                <Workout/>
              </Route>
              <Route path="/programs">
                <ProgramsView/>
              </Route>
              <Route path="/exercises">
                <Exercises/>
              </Route>
              <Route path="/equipment">
                <Equipment/>
              </Route>
            </Switch>
          </main>
        </Box>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
