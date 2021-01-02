export interface Program {
  name: string;
  id: number;
  routines: Array<Routine>;
}

export interface Routine {
  groups: Array<SetGroup>;
  name: string;
}

export interface SetGroup {
  liftId: number;
  mode: "percent" | "absolute";
  lifts: Set[];
}

export interface Set {
  reps: number;
  weight: number;
  amrap?: boolean;
  sets?: number;
}

export interface Lift {
  id: number;
  name: string;
  tm?: number;
}
