import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "index";
import { UserContext } from "store/UserProvider";
import { ProgramsContext, Routine } from "store/ProgramsProvider";

interface RoutineContext {
  routine: Routine | null;
  setRoutine: (programId: string | null, routineIndex: number | null) => void;
}

export const CurrentRoutineContext = React.createContext<RoutineContext>({
  routine: null,
  setRoutine: (id) => {},
});

export const CurrentRoutineConsumer = CurrentRoutineContext.Consumer;

const CurrentRoutineProvider: FunctionComponent = ({ children }) => {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const programs = useContext(ProgramsContext);
  const user = useContext(UserContext);

  useEffect(() => {
    db.collection("users")
      .doc(user?.id)
      .get()
      .then((resp) => {});
  }, [user]);

  const saveRoutine = (
    programId: string | null,
    routineIndex: number | null
  ) => {
    if (!!programId || !!routineIndex) {
      setRoutine(null);
      return;
    }

    const program = programs!.find((program) => program.id === programId);
    const currentRoutine = program && program.routines[routineIndex!];
    if (currentRoutine) {
      setRoutine(currentRoutine);
    }
  };

  return (
    <CurrentRoutineContext.Provider
      value={{ routine, setRoutine: saveRoutine }}
    >
      {children}
    </CurrentRoutineContext.Provider>
  );
};

export default CurrentRoutineProvider;
