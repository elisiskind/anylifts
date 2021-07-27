import { Lift, LiftsContext } from "store/LiftsProvider";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { CurrentUserContext } from "store/UserProvider";
import { db } from "index";
import firebase from "firebase/app";
import { DataContext } from "store/utils";

export interface ProgramData {
  name: string;
  id: string;
  routines: RoutineData[];
}

export interface RoutineData {
  groups: SetGroup[];
  name: string;
}

export interface Program {
  id: string;
  name: string;
  routines: Routine[];
}

export interface Routine {
  name: string;
  sets: Set[];
}

export interface SetGroup {
  liftId: string;
  mode: "percent" | "absolute";
  lifts: InternalSet[];
}

interface InternalSet {
  reps: number;
  weight: number;
  amrap?: boolean;
  sets?: number;
}

export interface Set {
  reps: number;
  amrap: boolean;
  weight: number;
  exercise: string;
  jokerSet?: boolean;
}

const buildSets = (routine: RoutineData, lifts: Lift[]): Set[] => {
  const sets: Set[] = [];
  for (let groupIndex = 0; groupIndex < routine.groups.length; groupIndex++) {
    const group = routine.groups[groupIndex];
    for (let liftIndex = 0; liftIndex < group.lifts.length; liftIndex++) {
      const lift = group.lifts[liftIndex];
      for (let setIndex = 0; setIndex < (lift.sets || 1); setIndex++) {
        const currentLift = lifts.find(
          (savedLift) => savedLift.id === group.liftId
        );
        if (currentLift) {
          const weight =
            group.mode === "percent"
              ? Math.round((lift.weight * 0.01 * (currentLift.tm || 0)) / 2.5) *
                2.5
              : lift.weight;
          sets.push({
            reps: lift.reps,
            weight: weight,
            amrap: lift.amrap || false,
            exercise: currentLift.name,
          });
        }
      }
    }
  }
  return sets;
};

export const ProgramsContext = React.createContext<DataContext<Program[]>>({
  data: null,
  loading: false,
});

const getResponseMapper = (lifts: Lift[]) => {
  return (
    doc: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData
    >
  ): Program => {
    return {
      name: doc.data().name,
      id: doc.data().id,
      routines: doc.data().routines.map(
        (routine: RoutineData): Routine => {
          return {
            name: routine.name,
            sets: buildSets(routine, lifts),
          };
        }
      ),
    };
  };
};

const ProgramsProvider: FunctionComponent = ({ children }) => {
  const { data: user } = useContext(CurrentUserContext);
  const lifts = useContext(LiftsContext);
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Refreshing programs");
    if (user && lifts) {
      setLoading(true);
      return db
        .collection("users")
        .doc("3P0vlRjrYXbe2Q0BBwkWDRoKeok2")
        .collection("programs")
        .onSnapshot(
          (resp) => {
            setPrograms(
              resp.docs.map((doc) => {
                return getResponseMapper(lifts)(doc);
              })
            );
            setLoading(false);
          },
          (err) => {
            console.log("Error fetching programs: " + err);
            setLoading(false);
          }
        );
    } else {
      setPrograms(null);
    }
  }, [user, lifts]);

  return (
    <ProgramsContext.Provider value={{ data: programs, loading }}>
      {children}
    </ProgramsContext.Provider>
  );
};

export default ProgramsProvider;
