import {Divider, Grid, useTheme} from "@material-ui/core";
import React from "react";

export interface AlDividerProps {
  grid?: boolean,
  space?: number,
}

export const AlDivider = ({grid, space} : AlDividerProps) => {

  const theme = useTheme()

  if (grid) {
    return <Grid item xs={12}>
      <Divider style={{margin: theme.spacing(space ? space : 2, 0)}}/>
    </Grid>
  } else {
      return <Divider style={{margin: theme.spacing(2, 0)}}/>
  }

}