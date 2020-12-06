import React from "react";
import {Grid} from "@material-ui/core";
import {WaPaper} from "../elements/WaPaper";
import {WaButton} from "../elements/WaButton";
import {FitnessCenter} from "@material-ui/icons";
import {WaSubtitle} from "../elements/WaSubtitle";
import {WaHeader} from "../elements/WaHeader";
import {WaHighlight} from "../elements/WaHighlight";
import {WaDivider} from "../elements/WaDivider";
import {PlateCalculator} from "./PlateCalculator";

export interface CurrentLiftProps {
  name: string,
  reps: number,
  weight?: number,
  plates?: Array<number>,
  bar?: number
}

export const CurrentLift = ({name, reps, plates, weight, bar}: CurrentLiftProps) => {

  return <WaPaper>
    <Grid container>
      <Grid item style={{margin: 'auto 15px'}}>
        <FitnessCenter style={{fontSize: 64}}/>
      </Grid>
      <Grid item>
        <WaHeader variant={"h2"}>
          {name}
        </WaHeader>
        <WaSubtitle>
          <WaHighlight>{weight}</WaHighlight> lbs
        </WaSubtitle>
        <WaSubtitle>
          <WaHighlight>{reps}</WaHighlight> reps
        </WaSubtitle>
      </Grid>
      {weight && plates && bar && (
        <>
          <WaDivider grid/>
          <Grid item xs={12}>
            <PlateCalculator weight={weight} plates={plates} bar={bar}/>
          </Grid>
        </>
      )}
      <WaDivider grid/>
      <Grid item container xs={12} justify={"center"}>
        <Grid item>
          <WaButton label={'Done'} color={"secondary"}/>
        </Grid>
        <Grid item>
          <WaButton label={'Failed'} outline/>
        </Grid>
      </Grid>
    </Grid>
  </WaPaper>
}