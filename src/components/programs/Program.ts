export interface Program {
  name: string,
  id: number,
  routines: Array<Day>
}

export interface Day {
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