import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Set {
  reps: number;
  amrap: boolean;
  weight: number;
  exercise: string;
}

export interface Routine {
  name: string;
  sets: Set[];
}

export interface Program {
  id: number;
  name: string;
  routines: Routine[];
}

type CurrentWorkoutState = {
  routine: Routine | null;
  currentSet: number | null;
};

let initialState = {
  routine: null,
  currentSet: null,
} as CurrentWorkoutState;

export const workoutDisplaySlice = createSlice({
  name: "workoutDisplay",
  initialState,
  reducers: {
    setWorkout(state, action: PayloadAction<number>) {
      // const id = action.payload;
      // state.routine = new
    },
    incrementCurrentSet(state) {
      state.currentSet = (state.currentSet || 0) + 1;
    },
    decrementCurrentSet(state) {
      state.currentSet =
        state.currentSet && state.currentSet > 0 ? state.currentSet - 1 : 0;
    },
  },
});

// export const {
//     setWorkout,
//     setCurrentSet
// } = workoutDisplaySlice.actions
//
// export default issuesDisplaySlice.reducer
