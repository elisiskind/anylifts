import { getLiftsForUser, Lift } from "./Lifts";
import { Programs } from "./HardcodedDataSource";

export interface ProgramData {
  name: string;
  id: number;
  routines: RoutineData[];
}


export interface RoutineData {
  groups: SetGroup[];
  name: string;
}

export interface Program {
  id: number;
  name: string;
  routines: Routine[];
}

export interface Routine {
  name: string;
  sets: Set[]
}

export interface SetGroup {
  liftId: number;
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

export const getProgramsForUser = (userId: number) => {
  return Programs.map((program): Program => {
    return {
      name: program.name,
      id: program.id,
      routines: program.routines.map((routine): Routine => {
        return {
          name: routine.name,
          sets: buildSets(routine, getLiftsForUser(userId))
        };
      })
    }
  })
};
