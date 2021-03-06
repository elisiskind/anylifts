import * as React from "react";
import { useEffect, useState } from "react";
import { Workout, WorkoutSelector } from "components/workout";
import {
  retrieveProgramId,
  retrieveRoutineIndex,
  storeProgramId,
  storeRoutineIndex,
} from "state/localStorage";
import { getProgramsForUser, Routine } from "state/Programs";

export const WorkoutsView = () => {
  const [programId, setProgramId] = useState<number | null>(
    retrieveProgramId()
  );
  const [routineIndex, setRoutineIndex] = useState<number | null>(
    retrieveRoutineIndex()
  );
  const [routine, setRoutine] = useState<Routine | null>(null);

  const selectWorkout = (
    programId: number | null,
    routineIndex: number | null
  ) => {
    storeProgramId(programId);
    storeRoutineIndex(routineIndex);
    setProgramId(programId);
    setRoutineIndex(routineIndex);
  };

  useEffect(() => {
    if (programId !== null && routineIndex !== null) {
      const program = getProgramsForUser(0).find(
        (program) => program.id === programId
      );
      const currentRoutine = program && program.routines[routineIndex];
      if (currentRoutine) {
        setRoutine(currentRoutine);
        return;
      }
    }
    setRoutine(null);
  }, [programId, routineIndex]);

  const reset = () => {
    selectWorkout(null, null);
  };

  return routine ? (
    <Workout routine={routine} reset={reset} />
  ) : (
    <WorkoutSelector selectWorkout={selectWorkout} />
  );
};
