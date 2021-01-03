import * as React from "react";
import { useState } from "react";
import {
  AppBar,
  createStyles,
  IconButton,
  List,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import {Fullscreen, FullscreenExit, Menu} from "@material-ui/icons";
import { AlHeader } from "../elements/AlHeader";
import Hidden from "@material-ui/core/Hidden";
import { AlButton } from "../elements/AlButton";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

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

  const toggleFullscreen = () => {
    if (!fullscreen) {
      setFullscreen(true);
      document.body.requestFullscreen().then((r) => setFullscreen(true));
    } else {
      document.exitFullscreen().then((r) => setFullscreen(false));
    }
  };

  const [fullscreen, setFullscreen] = useState<boolean>(false);

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
            <AlHeader variant="h1">AnyLifts</AlHeader>
          </Hidden>
          <Hidden xsDown>
            <AlHeader variant="h1">AnyLifts</AlHeader>
            <List component="nav" className={classes.navBar}>
              <AlButton
                onClick={() => history.push("workout")}
                className={classes.navButton}
                link
              >
                Workout
              </AlButton>
              <AlButton
                onClick={() => history.push("programs")}
                link
                className={classes.navButton}
              >
                Programs
              </AlButton>
              <AlButton
                onClick={() => history.push("exercises")}
                link
                className={classes.navButton}
              >
                Exercises
              </AlButton>
              <AlButton
                onClick={() => history.push("equipment")}
                link
                className={classes.navButton}
              >
                Equipment
              </AlButton>
            </List>
          </Hidden>
        </Grid>
        <AlButton link onClick={toggleFullscreen}>
          {fullscreen ? <FullscreenExit /> : <Fullscreen/>}
        </AlButton>
      </Toolbar>
    </AppBar>
  );
};