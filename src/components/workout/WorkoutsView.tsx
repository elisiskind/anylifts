import * as React from "react";
import { createContext, useContext } from "react";
import { Workout, WorkoutSelector } from "components/workout";
import { CurrentRoutine } from "store/Models";
import { StorageContext } from "store/StorageProvider";
import { loaded } from "store/utils";
import { Loader } from "components/elements/Loader";

interface CurrentRoutineController extends CurrentRoutine {
  nextSet: () => Promise<void>;
  previousSet: () => Promise<void>;
  restart: () => Promise<void>;
  finish: () => Promise<void>;
}

export const CurrentRoutineContext = createContext<CurrentRoutineController>(
  {} as CurrentRoutineController
);

export const WorkoutsView = () => {
  const {
    currentRoutine: { currentRoutine, restart, finish, previousSet, nextSet },
  } = useContext(StorageContext);

  if (!loaded(currentRoutine)) {
    return <Loader />;
  } else if (currentRoutine) {
    return (
      <CurrentRoutineContext.Provider
        value={{
          name: currentRoutine.name,
          sets: currentRoutine.sets,
          currentSet: currentRoutine.currentSet,
          previousSet,
          nextSet,
          finish,
          restart,
        }}
      >
        <Workout />
      </CurrentRoutineContext.Provider>
    );
  } else {
    return <WorkoutSelector />;
  }
};
