import * as React from "react";
import { useState } from "react";
import { Workout } from "./Workout";
import { WorkoutSelector } from "./WorkoutSelector";
import {
  getProgramIndex as retrieveProgramIndex,
  getWorkoutIndex as retrieveWorkoutIndex,
  setProgramIndex as storeProgramIndex,
  setWorkoutIndex as storeWorkoutIndex,
} from "../state/localStorage";
import { Lifts, Programs, WorkoutRoutine } from "../programs/Program";

export const WorkoutsView = () => {
  const [programIndex, setProgramIndex] = useState<number | null>(
    retrieveProgramIndex()
  );
  const [workoutIndex, setWorkoutIndex] = useState<number | null>(
    retrieveWorkoutIndex()
  );

  const selectWorkout = (
    programIndex: number | null,
    workoutIndex: number | null
  ) => {
    storeProgramIndex(programIndex);
    storeWorkoutIndex(workoutIndex);
    setProgramIndex(programIndex);
    setWorkoutIndex(workoutIndex);
  };

  const reset = () => {
    selectWorkout(null, null);
  };

  console.log('Program: ' + programIndex + ', Workout: ' + workoutIndex)
  const workout =
      (programIndex !== null && workoutIndex !== null)
      ? new WorkoutRoutine(Programs[programIndex].routines[workoutIndex], Lifts)
      : null;

  return (
    <>
      {workout ? (
        <Workout routine={workout} reset={reset} />
      ) : (
        <WorkoutSelector selectWorkout={selectWorkout} />
      )}
    </>
  );
};
