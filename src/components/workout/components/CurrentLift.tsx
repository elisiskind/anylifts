import React from "react";
import { FitnessCenter } from "@material-ui/icons";
import {
  Button,
  Divider,
  Header,
  Highlight,
  Paper,
  Subtitle,
} from "components/elements";
import { PlateCalculator } from "components/workout";
import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export interface CurrentLiftProps {
  name: string;
  reps: number;
  weight?: number;
  plates?: Array<number>;
  bar?: number;
  amrap: boolean;
  next: () => void;
  jokerSet: boolean;
  addJokerSet: () => void;
}

const useStyles = makeStyles(({ breakpoints, spacing }: Theme) => ({
  container: {
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    marginRight: spacing(1),
    [breakpoints.up("sm")]: {
      marginRight: spacing(2),
      fontSize: 48,
    },
  },
  buttons: {
    padding: spacing(2, 3),
    [breakpoints.up("md")]: {
      padding: spacing(3, 4),
    },
  },
}));

export const CurrentLift = ({
  name,
  reps,
  plates,
  weight,
  bar,
  amrap,
  next,
  jokerSet,
  addJokerSet,
}: CurrentLiftProps) => {
  const classes = useStyles();

  return (
    <Paper>
      <Grid container className={classes.container}>
        <Grid item>
          <FitnessCenter className={classes.icon} />
        </Grid>
        <Grid item>
          <Header variant={"h2"}>
            {name}
            {jokerSet && " - Joker Set"}
          </Header>
          <Subtitle>
            {!!weight && (
              <>
                <Highlight>{weight}</Highlight>
                {" lbs x "}
              </>
            )}
            <Highlight>{reps + (amrap ? "+" : "")}</Highlight> reps
          </Subtitle>
        </Grid>
        {!!weight && plates && !!bar && (
          <>
            <Divider grid />
            <Grid item xs={12}>
              <PlateCalculator weight={weight} plates={plates} bar={bar} />
            </Grid>
          </>
        )}
        <Divider grid />
        <Grid item container xs={12} justify="flex-end">
          {(jokerSet || amrap) && (
            <Grid item>
              <Button
                className={classes.buttons}
                color={"secondary"}
                onClick={addJokerSet}
                variant="link"
              >
                Joker Set
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              className={classes.buttons}
              onClick={next}
              color={"secondary"}
            >
              Done
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
