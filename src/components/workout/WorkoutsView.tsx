import * as React from "react";
import { Workout, WorkoutSelector } from "components/workout";
import CurrentRoutineProvider, {
  CurrentRoutineConsumer,
} from "store/CurrentRoutineProvider";

export const WorkoutsView = () => {
  return (
    <CurrentRoutineProvider>
      <CurrentRoutineConsumer>
        {(context) => {
          return context.currentRoutine ? <Workout /> : <WorkoutSelector />;
        }}
      </CurrentRoutineConsumer>
    </CurrentRoutineProvider>
  );
};
