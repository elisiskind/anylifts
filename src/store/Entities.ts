import firebase from "firebase";

interface Entity {
  id: string;
}

// Top level
export interface CurrentRoutineData {
  programId: string;
  routineIndex: number;
}

export interface CurrentSetData {
  setIndex: number;
  startTime: number;
}

interface CurrentWorkout {
  currentRoutineIndex?: CurrentRoutineData | null;
  currentSet?: CurrentSetData | null;
}

export interface UserData {
  displayName: string;
  currentWorkout?: CurrentWorkout;
  avatarUrl: string;
}

// Collections
export interface LiftData extends Entity {
  name: string;
  tm?: number;
}

export interface SetData extends Entity {
  reps: number;
  mode: "percent" | "absolute";
  weight: number;
  amrap?: boolean;
  sets?: number;
}

export interface TemplateData extends Entity {
  name: string;
  sets: SetData[];
  reusable: boolean;
}

export interface SetGroupData {
  liftId: string;
  templateId: string;
}

export interface RoutineData {
  groups: SetGroupData[];
  name: string;
}

export interface ProgramData extends Entity {
  name: string;
  routines: RoutineData[];
}

export const deserialize = <T extends Entity>(
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) => {
  return {
    id: doc.id,
    ...doc.data(),
  } as T;
};
