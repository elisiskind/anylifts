import React from "react";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface PlateCalculatorProps {
  weight: number;
  plates: number[];
  bar: number;
}

const requiredPlates = (
  availablePlates: number[],
  weight: number
): [number[], number] => {
  let total = 0;
  const plates = [];
  const sortedPlates = availablePlates.sort((a, b) => b - a);

  for (const plate of sortedPlates) {
    if (total + plate <= weight) {
      total += plate;
      plates.push(plate);

      if (total === weight) {
        return [plates, total];
      }
    }
  }

  for (const plate of sortedPlates.reverse().slice(1)) {
    const subset = sortedPlates.filter((p) => p !== plate);
    const [solution, solutionWeight] = requiredPlates(subset, weight);
    if (solutionWeight === weight) {
      return [solution, solutionWeight];
    }
  }

  return [plates, total];
};

const calculateForRange = (
  plates: number[],
  plate: number,
  min: number,
  max: number,
  invert?: boolean
): number => {
  const smallest = Math.min(...plates);
  const largest = Math.max(...plates);
  const range = largest - smallest;
  if (range === 0) {
    return (min + max) / 2;
  }
  if (!invert) {
    return min + ((plate - smallest) / range) * (max - min);
  } else {
    return max - ((plate - smallest) / range) * (max - min);
  }
};

const calculateColor = (plates: number[], plate: number): string[] => {
  const colors = [
    ["#f5de5f", "#867309"],
    ["#96cc58", "#547d26"],
    ["#68d2de", "#1d7b86"],
    ["#aeaded", "#1b1a75"],
    ["#edaddb", "#861d68"],
    ["#f7b083", "#99410a"],
  ];
  const index =
    Array.from(new Set(plates))
      .sort((a, b) => a - b)
      .indexOf(plate) % colors.length;

  return colors[index];
};

const calculatePlateDisplaySize = (plates: number[], plate: number): number => {
  return calculateForRange(plates, plate, 112, 200);
};

export const useStyles = makeStyles(
  ({ palette, spacing, breakpoints }: Theme) => ({
    bar: {
      fontSize: 12,
      padding: spacing(1, 1),
      [breakpoints.up("sm")]: {
        fontSize: 16,
        padding: spacing(3, 1),
      },
      borderStyle: "none solid none solid",
      borderWidth: "2px",
      borderColor: palette.grey[400],
      writingMode: "vertical-rl",
      fontWeight: 700,
      margin: "0 auto",
      width: "40px",
    },
    barFiller: {
      borderStyle: "none solid none solid",
      borderWidth: "2px",
      borderColor: palette.grey[400],
      margin: "0 auto",
      width: "40px",
      height: "2px",
    },
    barEnd: {
      borderStyle: "none solid solid solid",
      borderWidth: "2px",
      borderColor: palette.grey[400],
      padding: spacing(0.5, 1),
      [breakpoints.up("sm")]: {
        padding: spacing(1, 1),
      },
      margin: "0 auto",
      width: "40px",
    },
    plate: {
      fontSize: 12,
      padding: spacing(0.5, 3),
      [breakpoints.up("sm")]: {
        fontSize: 16,
        padding: spacing(1, 3),
      },
      color: palette.grey[900],
      border: "2px solid " + palette.primary.main,
      fontWeight: 700,
      borderRadius: 5,
      margin: "0 auto",
      width: "150px",
      textAlign: "center",
    },
  })
);

export const PlateCalculator = ({
  weight,
  plates,
  bar,
}: PlateCalculatorProps) => {
  const classes = useStyles();
  const [plateList, totalWeight] = requiredPlates(plates, (weight - bar) / 2);
  const remainingWeight = weight - (totalWeight * 2 + bar);
  const weightAchieved = remainingWeight === 0;

  return (
    <Grid container justify={"center"} direction={"column"}>
      {remainingWeight < 0 ? (
        <Grid item>Your barbell is too heavy for the selected weight!</Grid>
      ) : (
        <>
          <Grid item className={classes.bar}>
            {bar} lbs
          </Grid>
          {plateList.map((plate, index) => {
            return (
              <Box key={index}>
                <Grid item className={classes.barFiller} />
                <Grid
                  item
                  className={classes.plate}
                  style={{
                    width: calculatePlateDisplaySize(plates, plate),
                    backgroundColor: calculateColor(plates, plate)[0],
                    border: "2px solid " + calculateColor(plates, plate)[1],
                  }}
                >
                  {plate} lbs
                </Grid>
              </Box>
            );
          })}
          <Grid item className={classes.barEnd} />
          {!weightAchieved && (
            <Grid item xs={12}>
              {remainingWeight} lbs remaining.
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
