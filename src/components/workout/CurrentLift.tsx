import React from "react";
import {AlPaper} from "../elements/AlPaper";
import {AlButton} from "../elements/AlButton";
import {FitnessCenter} from "@material-ui/icons";
import {AlSubtitle} from "../elements/AlSubtitle";
import {AlHeader} from "../elements/AlHeader";
import {AlHighlight} from "../elements/AlHighlight";
import {AlDivider} from "../elements/AlDivider";
import {PlateCalculator} from "./PlateCalculator";
import {Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export interface CurrentLiftProps {
  name: string,
  reps: number,
  weight?: number,
  plates?: Array<number>,
  bar?: number
}

const useStyles = makeStyles(({breakpoints,spacing}: Theme) => ({
  container: {
    alignItems: 'center'
  },
  icon: {
    fontSize: 48,
    marginRight: spacing(1),
    [breakpoints.up('sm')]: {
    marginRight: spacing(3),
      fontSize: 64,
    },
  }
}))

export const CurrentLift = ({name, reps, plates, weight, bar}: CurrentLiftProps) => {

  const classes = useStyles();

  return <AlPaper>
    <Grid container className={classes.container}>
      <Grid item>
        <FitnessCenter className={classes.icon}/>
      </Grid>
      <Grid item>
        <AlHeader variant={"h2"}>
          {name}
        </AlHeader>
        <AlSubtitle>
          <AlHighlight>{weight}</AlHighlight> lbs
        </AlSubtitle>
        <AlSubtitle>
          <AlHighlight>{reps}</AlHighlight> reps
        </AlSubtitle>
      </Grid>
      {weight && plates && bar && (
        <>
          <AlDivider grid/>
          <Grid item xs={12}>
            <PlateCalculator weight={weight} plates={plates} bar={bar}/>
          </Grid>
        </>
      )}
      <AlDivider grid/>
      <Grid item container xs={12} justify="space-around">
        <Grid item>
          <AlButton color={"secondary"}>Done</AlButton>
        </Grid>
        <Grid item>
          <AlButton outline>Failed</AlButton>
        </Grid>
      </Grid>
    </Grid>
  </AlPaper>
}