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
import { AlHeader } from "../elements/AlHeader";
import Hidden from "@material-ui/core/Hidden";
import { AlButton } from "../elements/AlButton";
import { useHistory } from "react-router-dom";

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
      navBar: {
        display: "flex",
      },
    })
);

interface AlAppBarProps {
  handleToggle: () => void;
}

export const AlAppBar = ({ handleToggle }: AlAppBarProps) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleToggle}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <Hidden xsDown>
          <AlHeader variant="h1">AnyLifts</AlHeader>
          <List component="nav" className={classes.navBar}>
            <AlButton onClick={() => history.push("programs")} link>
              Programs
            </AlButton>
            <AlButton onClick={() => history.push("exercises")} link>
              Exercises
            </AlButton>
            <AlButton onClick={() => history.push("equipment")} link>
              Equipment
            </AlButton>
          </List>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
