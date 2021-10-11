import { ProgramData, UserData } from "store/Entities";
import {
  CurrentRoutine,
  Lift,
  Program,
  Routine,
  SetGroup,
  Template,
} from "store/Models";

export const parsePrograms = (
  programData: ProgramData[],
  templates: Template[],
  lifts: Lift[]
) => {
  return programData.map((program) => {
    return {
      id: program.id,
      name: program.name,
      routines: program.routines.map(
        (routine): Routine => {
          return {
            name: routine.name,
            groups: routine.groups.map(
              (g): SetGroup => {
                return {
                  template: templates.find((t) => t.id === g.templateId)!,
                  lift: lifts.find((l) => l.id === g.liftId)!,
                };
              }
            ),
          };
        }
      ),
    };
  });
};

export const parseRoutine = (
  programs: Program[],
  userData: UserData
): CurrentRoutine | null => {
  if (userData.currentWorkout?.currentRoutineIndex) {
    const currentProgramId =
      userData.currentWorkout.currentRoutineIndex.programId;
    const currentProgram = programs.find((p) => (p.id = currentProgramId));
    if (!currentProgram) {
      console.log("Error loading program...");
      return null;
    }
    const currentRoutineData =
      currentProgram?.routines[
        userData.currentWorkout.currentRoutineIndex.routineIndex
      ];
    return {
      name: currentRoutineData!.name,
      sets: currentRoutineData!.groups.flatMap((g) => {
        return g.template.sets.map((s) => {
          return {
            lift: g.lift.name,
            reps: s.reps,
            amrap: s.amrap ?? false,
            weight:
              s.mode === "percent"
                ? ((s.weight * (g.lift.tm ?? 0)) / 2.5) * 2.5
                : s.weight,
            jokerSet: false,
          };
        });
      }),
      currentSet: userData.currentWorkout.currentSet ?? {
        setIndex: 0,
        startTime: new Date().getUTCMilliseconds(),
      },
    };
  }
  return null;
};

export type Loadable<T> = T | "LOADING";
export const LOADING = "LOADING";
export const loaded = <T extends any>(value: Loadable<T>): value is T =>
  value !== LOADING;
export const loadedValue = <T extends any>(value: Loadable<T[]>) =>
  value !== LOADING ? value : [];
