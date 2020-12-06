import React from "react";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";

export interface PlateCalculatorProps {
  weight: number,
  plates: number[],
  bar: number
}

const requiredPlates = (availablePlates: number[], weight: number): [number[], number] => {
  let total = 0;
  const plates = [];
  const sortedPlates = availablePlates.sort((a, b) => b - a);

  for (const plate of sortedPlates) {
    if (total + plate <= weight) {
      total += plate
      plates.push(plate)

      if (total === weight) {
        return [plates, total]
      }
    }
  }

  for (const plate of sortedPlates.reverse().slice(1)) {
    const subset = sortedPlates.filter(p => p !== plate)
    const [solution, solutionWeight] = requiredPlates(subset, weight);
    if (solutionWeight === weight) {
      return [solution, solutionWeight]
    }
  }

  return [plates, total]
}

const calculatePlateDisplaySize = (plates: number[], plate: number): number => {
  const smallest = Math.min(...plates)
  const largest = Math.max(...plates)
  const range = largest - smallest
  return 110 + ((plate - smallest) / range) * 90
}

export const useStyles = makeStyles(({palette, spacing}: Theme) => ({
  bar: {
    borderStyle: 'none solid none solid',
    borderWidth: '2px',
    borderColor: palette.grey[400],
    padding: spacing(3, 1),
    writingMode: 'vertical-rl',
    fontWeight: 700,
    margin: '0 auto',
    width: '40px'
  },
  barFiller: {
    borderStyle: 'none solid none solid',
    borderWidth: '2px',
    borderColor: palette.grey[400],
    margin: '0 auto',
    width: '40px',
    height: '2px'
  },
  barEnd: {
    borderStyle: 'none solid solid solid',
    borderWidth: '2px',
    borderColor: palette.grey[400],
    padding: spacing(1, 1),
    margin: '0 auto',
    width: '40px'
  },
  plate: {
    color: palette.primary.main,
    border: '2px solid ' + palette.primary.main,
    padding: spacing(1, 3),
    fontWeight: 700,
    borderRadius: 5,
    margin: '0 auto',
    width: '150px',
    textAlign: 'center'
  }
}))

export const PlateCalculator = ({weight, plates, bar}: PlateCalculatorProps) => {

  const classes = useStyles();
  const [plateList, totalWeight] = requiredPlates(plates, (weight - bar) / 2);
  const remainingWeight = weight - (totalWeight * 2 + bar)
  const weightAchieved = remainingWeight === 0;

  return <Grid container justify={'center'} direction={"column"}>
    {(remainingWeight < 0) ? (
      <Grid item>
        Your barbell is too heavy for the selected weight!
      </Grid>
    ) : (
      <>
        <Grid item className={classes.bar}>{bar} lbs</Grid>
        {plateList.map(plate => {
          return <>
            <Grid item className={classes.barFiller}/>
            <Grid item className={classes.plate}
                  style={{width: calculatePlateDisplaySize(plateList, plate)}}>{plate} lbs</Grid>
          </>
        })}
        <Grid item className={classes.barEnd}/>
        {(!weightAchieved) && (<Grid item xs={12}>
            {remainingWeight} lbs remaining.
          </Grid>
        )}
      </>
    )}
  </Grid>
}