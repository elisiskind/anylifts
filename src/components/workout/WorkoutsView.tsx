import * as React from 'react';
import {useState} from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {WorkoutRoutine} from "../programs/Program";
import {Workout} from "./Workout";
import {WorkoutSelector} from "./WorkoutSelector";

const useStyles = makeStyles((theme: Theme) => ({}));

export const WorkoutsView = () => {
  const classes = useStyles();

  const [workout, setWorkout] = useState<WorkoutRoutine | null>(null);

  return (
    <>
      {workout ? <Workout routine={workout} reset={() => setWorkout(null)}/> : (
        <WorkoutSelector selectWorkout={setWorkout}/>
      )}
    </>
  );
};
