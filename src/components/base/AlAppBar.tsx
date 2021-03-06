import * as React from "react";
import {
  AppBar,
  createStyles,
  IconButton,
  List,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Hidden from "@material-ui/core/Hidden";
import { Button, Header } from "components/elements";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { State } from "store/reducers";

const useStyles = makeStyles(
  ({ palette, spacing, breakpoints, mixins }: Theme) =>
    createStyles({
      root: {
        backgroundColor: "white",
        borderBottom: "2px solid " + palette.grey.A100,
        boxShadow: "none",
        color: "black",
      },
      menuButton: {
        marginRight: spacing(2),
        [breakpoints.up("sm")]: {
          display: "none",
        },
      },
      navButton: {
        "@media (max-width: 648px)": {
          paddingLeft: "20px",
          paddingRight: "20px",
        },
      },
      navBar: {
        display: "flex",
      },
      toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },
      leftSide: {
        width: "initial",
        display: "flex",
        alignItems: "center",
      },
    })
);

interface AlAppBarProps {
  handleToggle: () => void;
}

export const AlAppBar = ({ handleToggle }: AlAppBarProps) => {
  const classes = useStyles();
  const history = useHistory();

  const firebase = useFirebase();

  const auth = useSelector((state: State) => state.firebase.auth);
  const loggedIn = isLoaded(auth) && !isEmpty(auth);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Grid container className={classes.leftSide}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Hidden smUp>
            <Header variant="h1">AnyLifts</Header>
          </Hidden>
          <Hidden xsDown>
            <Header variant="h1">AnyLifts</Header>
            {loggedIn && (
              <List component="nav" className={classes.navBar}>
                <Button
                  onClick={() => history.push("workout")}
                  className={classes.navButton}
                  variant="link"
                >
                  Workout
                </Button>
                <Button
                  onClick={() => history.push("programs")}
                  className={classes.navButton}
                  variant="link"
                >
                  Programs
                </Button>
                <Button
                  onClick={() => history.push("exercises")}
                  className={classes.navButton}
                  variant="link"
                >
                  Exercises
                </Button>
                <Button
                  onClick={() => history.push("equipment")}
                  className={classes.navButton}
                  variant="link"
                >
                  Equipment
                </Button>
              </List>
            )}
          </Hidden>
        </Grid>
        {loggedIn && (
          <Button
            onClick={() => firebase.logout()}
            className={classes.navButton}
            variant="link"
          >
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
