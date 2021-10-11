import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Box,
  createMuiTheme,
  createStyles,
  CssBaseline,
  Hidden,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProgramsView from "components/programs";
import ExercisesView from "components/exercises";
import EquipmentView from "components/equipment";
import { AlAppBar } from "components/base/AlAppBar";
import { AlNavigationDrawer } from "components/base/AlNavigationDrawer";
import WorkoutsView from "components/workout";
import { LoginView, PrivateRoute } from "components/auth";
import { RequestNotificationsPermissions } from "lib/notifications";

const drawerWidth = 240;

const useStyles = makeStyles(
  ({ palette, spacing, breakpoints, mixins }: Theme) =>
    createStyles({
      root: {
        display: "flex",
        height: "100%",
      },
      drawer: {
        [breakpoints.up("sm")]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      // necessary for content to be below app bar
      toolbar: {
        height: "58px",
        [breakpoints.up("sm")]: {
          height: "66px",
        },
      },
      content: {
        height: "100%",
        flexGrow: 1,
        background: palette.grey["100"],
      },
      contentContainer: {
        overflowY: "auto",
        overflowX: "hidden",
        height: "calc(100% - 58px)",
        [breakpoints.up("sm")]: {
          height: "calc(100% - 66px)",
        },
      },
    })
);

export const AppTheme = {
  palette: {
    primary: {
      main: "#008C88",
    },
    secondary: {
      main: "#940063",
    },
    error: {
      main: "#DE432E",
    },
    warning: {
      main: "#FFA825",
    },
    info: {
      main: "#2D73E4",
    },
    success: {
      main: "#5ba100",
    },
  },
};

function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = createMuiTheme(AppTheme);

  useEffect(() => {
    RequestNotificationsPermissions();
  });

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Box className={classes.root}>
          <CssBaseline />
          <AlAppBar handleToggle={handleDrawerToggle} />
          <Hidden smUp implementation="css">
            <nav className={classes.drawer}>
              <AlNavigationDrawer
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                drawerWidth={drawerWidth}
              />
            </nav>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Box className={classes.contentContainer}>
              <Switch>
                <Route path="/login">
                  <LoginView />
                </Route>
                <PrivateRoute path="/workout">
                  <WorkoutsView />
                </PrivateRoute>
                <PrivateRoute path="/programs">
                  <ProgramsView />
                </PrivateRoute>
                <PrivateRoute path="/exercises">
                  <ExercisesView />
                </PrivateRoute>
                <PrivateRoute path="/equipment">
                  <EquipmentView />
                </PrivateRoute>
              </Switch>
            </Box>
          </main>
        </Box>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
