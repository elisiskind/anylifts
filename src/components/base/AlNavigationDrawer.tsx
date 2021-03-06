import * as React from "react";
import { Drawer, List, makeStyles, Theme, useTheme } from "@material-ui/core";
import {
  ListItemLink,
  Header,
  WeightsIcon,
  LiftingIcon,
  BicepIcon,
  Divider,
} from "components/elements";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  drawerPaper: {
    width: (drawerWidth: number) => drawerWidth,
    backgroundColor: "white",
    border: "2px solid " + palette.grey.A100,
    boxShadow: "none",
    borderRadius: 20,
    margin: spacing(1),
    height: "calc(100% - 16px);",
  },
  header: {
    marginTop: spacing(2),
    padding: spacing(0, 2),
    textAlign: "center",
    fontSize: "large !important",
  },
  nav: {
    marginTop: spacing(-2),
  },
}));

interface AlNavigationDrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

export const AlNavigationDrawer = ({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}: AlNavigationDrawerProps) => {
  const classes = useStyles(drawerWidth);
  const theme = useTheme();

  return (
    <Drawer
      variant="temporary"
      anchor={theme.direction === "rtl" ? "right" : "left"}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      classes={{ paper: classes.drawerPaper }}
      ModalProps={{ keepMounted: true }}
    >
      <Box className={classes.header}>
        <Header variant={"h1"}>AnyLifts</Header>
      </Box>
      <Divider />
      <List component="nav" className={classes.nav}>
        <ListItemLink
          to="/workout"
          primary={"Workout"}
          icon={<BicepIcon fontSize={"large"} />}
          action={handleDrawerToggle}
        />
        <ListItemLink
          to="/programs"
          primary={"Programs"}
          icon={<BicepIcon fontSize={"large"} />}
          action={handleDrawerToggle}
        />
        <ListItemLink
          to="/exercises"
          primary={"Exercises"}
          icon={<LiftingIcon fontSize={"large"} />}
          action={handleDrawerToggle}
        />
        <ListItemLink
          to="/equipment"
          primary={"Equipment"}
          icon={<WeightsIcon fontSize={"large"} />}
          action={handleDrawerToggle}
        />
      </List>
    </Drawer>
  );
};
