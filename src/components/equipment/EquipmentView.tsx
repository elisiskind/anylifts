import React from "react";
import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Header,
  Highlight,
  Subtitle,
  WeightsIcon,
} from "components/elements";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(({ spacing, breakpoints, palette }: Theme) => ({
  container: {
    flexGrow: 1,
  },
  icon: {
    fontSize: 16,
    marginRight: spacing(1),
    [breakpoints.up("sm")]: {
      marginRight: spacing(3),
      fontSize: 20,
    },
  },
  card: {
    alignItems: "center",
    padding: spacing(2, 4),
    backgroundColor: "white",
    border: "2px solid " + palette.grey.A100,
    borderRadius: 20,
  },
  plate: {
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    borderRadius: 10,
    whiteSpace: "nowrap",
    fontSize: 12,
    padding: spacing(1),
    margin: spacing(1, 0),
    lineHeight: "33px",
  },
}));

export const AvailableEquipment = [
  {
    name: "Olympic",
    bar: 45,
    plates: [1.25, 2.5, 5, 10, 10, 10, 35, 45],
  },
  {
    name: "Standard",
    bar: 20,
    plates: [2.5, 2.5, 5, 5, 7.5, 7.5, 10, 25, 25],
  },
];

export const EquipmentView = () => {
  const classes = useStyles();

  return (
    <Box padding={3}>
      <Grid container spacing={3}>
        {AvailableEquipment.map(({ name, bar, plates }) => {
          return (
            <Grid item xs={12} sm={6}>
              <Grid container className={classes.card}>
                <Grid item>
                  <WeightsIcon className={classes.icon} />
                </Grid>
                <Grid item>
                  <Header variant={"h1"}>{name}</Header>
                </Grid>
                <Divider grid />
                <Grid item xs={12} justify="space-around">
                  <Subtitle>
                    Bar: <Highlight>{bar} </Highlight> lbs
                  </Subtitle>
                  <Subtitle>
                    Plates:{" "}
                    {plates.map((plate) => (
                      <>
                        <Box className={classes.plate} component={"span"}>
                          {plate} lbs
                        </Box>{" "}
                      </>
                    ))}
                  </Subtitle>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
