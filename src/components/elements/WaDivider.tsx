import {Divider, Grid, useTheme} from "@material-ui/core";
import React from "react";

export interface WaDividerProps {
  grid?: boolean
}

export const WaDivider = ({grid} : WaDividerProps) => {

  const theme = useTheme()

  if (grid) {
    return <Grid item xs={12}>
      <Divider style={{margin: theme.spacing(2, 0)}}/>
    </Grid>
  } else {
      return <Divider style={{margin: theme.spacing(2, 0)}}/>
  }

}