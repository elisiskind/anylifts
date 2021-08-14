import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProgramsContext, Routine } from "store/ProgramsProvider";
import {
  CurrentRoutineIndex,
  CurrentSet,
  CurrentUserContext,
} from "store/UserProvider";

interface RoutineContext {
  currentRoutine: Routine | null;
  currentSet: CurrentSet | null;
  selectCurrentRoutineIndex: (
    programIndex: CurrentRoutineIndex | null
  ) => Promise<void>;
  selectCurrentSet: (currentSet: CurrentSet | null) => Promise<void>;
}

export const CurrentRoutineContext = React.createContext<RoutineContext>({
  currentSet: null,
  selectCurrentSet: async () => {},
  currentRoutine: null,
  selectCurrentRoutineIndex: async () => {},
});

export const CurrentRoutineConsumer = CurrentRoutineContext.Consumer;

const CurrentRoutineProvider: FunctionComponent = ({ children }) => {
  const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null);
  const [currentSet, setCurrentSet] = useState<CurrentSet | null>(null);
  const { data: programs } = useContext(ProgramsContext);
  const { data: user, updateUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const { currentRoutineIndex, currentSet } = user?.currentWorkout ?? {};

    if (!user || !currentRoutineIndex || !programs) {
      setCurrentRoutine(null);
    } else {
      const currentProgram = programs!.find(
        (program) => program.id === currentRoutineIndex.programId
      );
      setCurrentRoutine(
        currentProgram?.routines[currentRoutineIndex.routineIndex] ?? null
      );
    }

    console.log(JSON.stringify(currentSet));
    setCurrentSet(currentSet ?? null);
  }, [user, programs]);

  const selectCurrentRoutineIndex = async (
    currentRoutineIndex: CurrentRoutineIndex | null
  ) => {
    await updateUser("currentWorkout.currentRoutineIndex", currentRoutineIndex);
  };

  const selectCurrentSet = async (currentSet: CurrentSet | null) => {
    await updateUser("currentWorkout.currentSet", currentSet);
  };

  return (
    <CurrentRoutineContext.Provider
      value={{
        currentRoutine,
        selectCurrentRoutineIndex,
        currentSet,
        selectCurrentSet,
      }}
    >
      {children}
    </CurrentRoutineContext.Provider>
  );
};

export default CurrentRoutineProvider;
