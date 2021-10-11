import { CurrentSetData } from "store/Entities";

export interface Lift {
  id: string;
  name: string;
  tm?: number;
}

export interface Set {
  reps: number;
  mode: "percent" | "absolute";
  amrap?: boolean;
  weight: number;
}

export interface Template {
  id: string;
  name: string;
  sets: Set[];
  reusable: boolean;
}

export interface SetGroup {
  lift: Lift;
  template: Template;
}

export interface Routine {
  name: string;
  groups: SetGroup[];
}

export interface Program {
  id: string;
  name: string;
  routines: Routine[];
}

export interface CurrentRoutineSet {
  reps: number;
  amrap: boolean;
  weight: number;
  lift: string;
}

export interface CurrentRoutine {
  name: string;
  sets: CurrentRoutineSet[];
  currentSet: CurrentSetData;
}
