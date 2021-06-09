import * as React from "react";
import { useEffect, useState } from "react";
import { Workout, WorkoutSelector } from "components/workout";
import { Routine } from "state/Programs";
import { CurrentWorkoutProvider } from "store/CurrentWorkoutContext";

export const WorkoutsView = () => {
  useEffect(() => {});

  const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null);

  const reset = () => {
    setCurrentRoutine(null);
  };

  return (
    <CurrentWorkoutProvider value={currentRoutine}>
      {currentRoutine ? (
        <Workout reset={reset} />
      ) : (
        <WorkoutSelector selectWorkout={() => {}} />
      )}
    </CurrentWorkoutProvider>
  );
};
