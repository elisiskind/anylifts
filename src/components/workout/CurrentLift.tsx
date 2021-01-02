import React from "react";
import { AlPaper } from "../elements/AlPaper";
import { AlButton } from "../elements/AlButton";
import { FitnessCenter } from "@material-ui/icons";
import { AlSubtitle } from "../elements/AlSubtitle";
import { AlHeader } from "../elements/AlHeader";
import { AlHighlight } from "../elements/AlHighlight";
import { AlDivider } from "../elements/AlDivider";
import { PlateCalculator } from "./PlateCalculator";
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
}: CurrentLiftProps) => {
  const classes = useStyles();

  return (
    <AlPaper>
      <Grid container className={classes.container}>
        <Grid item>
          <FitnessCenter className={classes.icon} />
        </Grid>
        <Grid item>
          <AlHeader variant={"h2"}>{name}</AlHeader>
          <AlSubtitle>
            {!!weight && (
              <>
                <AlHighlight>{weight}</AlHighlight>
                {" lbs x "}
              </>
            )}
            <AlHighlight>{reps + (amrap ? "+" : "")}</AlHighlight> reps
          </AlSubtitle>
        </Grid>
        {!!weight && plates && !!bar && (
          <>
            <AlDivider grid />
            <Grid item xs={12}>
              <PlateCalculator weight={weight} plates={plates} bar={bar} />
            </Grid>
          </>
        )}
        <AlDivider grid />
        <Grid item container xs={12} justify="flex-end">
          <Grid item>
            <AlButton
              className={classes.buttons}
              color={"secondary"}
              onClick={next}
              link
            >
              Failed
            </AlButton>
          </Grid>
          <Grid item>
            <AlButton
              className={classes.buttons}
              onClick={next}
              color={"secondary"}
            >
              Done
            </AlButton>
          </Grid>
        </Grid>
      </Grid>
    </AlPaper>
  );
};