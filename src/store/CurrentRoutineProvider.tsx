import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProgramsContext, Routine } from "store/ProgramsProvider";
import { CurrentUserContext, ProgramIndex } from "store/UserProvider";

interface RoutineContext {
  routine: Routine | null;
  setRoutine: (programIndex: ProgramIndex | null) => Promise<void>;
}

export const CurrentRoutineContext = React.createContext<RoutineContext>({
  routine: null,
  setRoutine: async () => {},
});

export const CurrentRoutineConsumer = CurrentRoutineContext.Consumer;

const CurrentRoutineProvider: FunctionComponent = ({ children }) => {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const { data: programs, loading } = useContext(ProgramsContext);
  const { data: user, updateUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const { programIndex, set } = user?.currentWorkout ?? {
      programIndex: null,
      set: null,
    };

    if (!user || !programIndex || !programs) {
      setRoutine(null);
    } else {
      console.log(
        `Updating program: [${programIndex.programId}, ${programIndex.routineIndex}`
      );
      const currentProgram = programs!.find(
        (program) => program.id === programIndex.programId
      );
      const currentRoutine =
        currentProgram && currentProgram.routines[programIndex.routineIndex];
      if (currentRoutine) {
        setRoutine(currentRoutine);
      }
    }
  }, [user, programs]);

  const selectRoutine = async (programIndex: ProgramIndex | null) => {
    await updateUser("currentWorkout", { programIndex });
  };

  return (
    <CurrentRoutineContext.Provider
      value={{ routine, setRoutine: selectRoutine }}
    >
      {children}
    </CurrentRoutineContext.Provider>
  );
};

export default CurrentRoutineProvider;
