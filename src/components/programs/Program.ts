export interface Program {
  name: string,
  id: number,
  routines: Array<Routine>
}

export interface Routine {
  lifts: Array<SetGroup>
}

export interface SetGroup {
  sets: Array<Set>,
}

export interface Set {
  lift: Lift,
  reps: number,
  weight?: number,
  percentage?: number
  amrap: boolean
}

export interface Lift {
  name: string
  tm?: number
}