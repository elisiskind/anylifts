import { Lift, Program, Routine } from "../../domain/Programs";

interface Set {
  reps: number;
  amrap: boolean;
  weight: number;
  exercise: string;
}

export class WorkoutRoutine {
  readonly sets;

  getSet = (index: number) => {
    return this.sets[index];
  };

  constructor(routine: Routine, lifts: Lift[]) {
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
                ? Math.round(
                    (lift.weight * 0.01 * (currentLift.tm || 0)) / 2.5
                  ) * 2.5
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
    this.sets = sets;
  }
}

export const Lifts: Lift[] = [
  {
    name: "Bench Press",
    id: 1,
    tm: 150,
  },
  {
    name: "Squat",
    id: 2,
    tm: 190,
  },
  {
    name: "Deadlift",
    id: 3,
    tm: 180,
  },
  {
    name: "Overhead Press",
    id: 4,
    tm: 100,
  },
  {
    name: "Barbell Row",
    id: 5,
    tm: 120,
  },
  {
    name: "Pullup",
    id: 6,
  },
  {
    name: "Chest Supported Row",
    id: 7,
  },
  {
    name: "Rear Delt Flye",
    id: 8,
    tm: 20,
  },
  {
    name: "Hammer Curl",
    id: 9,
    tm: 30,
  },
  {
    name: "Dumbbell Curl",
    id: 10,
    tm: 30,
  },
  {
    name: "Incline Dumbell Press",
    id: 11,
    tm: 30,
  },
  {
    name: "Lateral Raise",
    id: 12,
    tm: 30,
  },
  {
    name: "Skullcrusher",
    id: 13,
    tm: 30,
  },
  {
    name: "Triceps Extension",
    id: 14,
    tm: 30,
  },

];

export const Programs: Program[] = [
  {
    name: "5/3/1 For Beginners",
    id: 0,
    routines: [
      {
        name: "1-1",
        groups: [
          {
            liftId: 1,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 3 },
              { weight: 65, reps: 5 },
              { weight: 75, reps: 5 },
              { weight: 85, reps: 5, amrap: true },
              { weight: 65, reps: 5, sets: 5 },
            ],
          },
          {
            liftId: 2,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 3 },
              { weight: 65, reps: 5 },
              { weight: 75, reps: 5 },
              { weight: 85, reps: 5, amrap: true },
              { weight: 65, reps: 5, sets: 5 },
            ],
          },
        ],
      },
      {
        name: "1-2",
        groups: [
          {
            liftId: 3,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 3 },
              { weight: 65, reps: 5 },
              { weight: 75, reps: 5 },
              { weight: 85, reps: 5, amrap: true },
              { weight: 65, reps: 5, sets: 5 },
            ],
          },
          {
            liftId: 4,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 3 },
              { weight: 65, reps: 5 },
              { weight: 75, reps: 5 },
              { weight: 85, reps: 5, amrap: true },
              { weight: 65, reps: 5, sets: 5 },
            ],
          },
        ],
      },
      {
        name: "1-3",
        groups: [
          {
            liftId: 2,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 3 },
              { weight: 65, reps: 5 },
              { weight: 75, reps: 5 },
              { weight: 85, reps: 5, amrap: true },
              { weight: 65, reps: 5, sets: 5 },
            ],
          },
          {
            liftId: 1,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 3 },
              { weight: 65, reps: 5 },
              { weight: 75, reps: 5 },
              { weight: 85, reps: 5, amrap: true },
              { weight: 65, reps: 5, sets: 5 },
            ],
          },
        ],
      },
      {
        name: "2-1",
        groups: [
          {
            liftId: 1,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 3 },
              { weight: 70, reps: 3 },
              { weight: 80, reps: 3 },
              { weight: 90, reps: 3, amrap: true },
              { weight: 70, reps: 5, sets: 5 },
            ],
          },
          {
            liftId: 2,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 3 },
              { weight: 70, reps: 3 },
              { weight: 80, reps: 3 },
              { weight: 90, reps: 3, amrap: true },
              { weight: 70, reps: 5, sets: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "PPL",
    id: 1,
    routines: [
      {
        name: "Pull 1",
        groups: [
          {
            liftId: 5,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 5 },
              { weight: 70, reps: 3 },
              { weight: 85, reps: 5, sets: 4 },
              { weight: 85, reps: 5, amrap: true },
            ],
          },
          {
            liftId: 6,
            mode: "percent",
            lifts: [{ weight: 100, reps: 10, sets: 3 }],
          },
          {
            liftId: 7,
            mode: "absolute",
            lifts: [{ weight: 35, reps: 10, sets: 3 }],
          },
          {
            liftId: 8,
            mode: "absolute",
            lifts: [{ weight: 10, reps: 10, sets: 3 }],
          },
          {
            liftId: 9,
            mode: "absolute",
            lifts: [{ weight: 20, reps: 10, sets: 3 }],
          },
          {
            liftId: 10,
            mode: "absolute",
            lifts: [{ weight: 20, reps: 10, sets: 3 }],
          },
        ],
      },
      {
        name: "Push 1",
        groups: [
          {
            liftId: 1,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 5 },
              { weight: 70, reps: 3 },
              { weight: 85, reps: 5, sets: 4 },
              { weight: 85, reps: 5, amrap: true },
            ],
          },
          {
            liftId: 4,
            mode: "percent",
            lifts: [{ weight: 60, reps: 10, sets: 3 }],
          },
          {
            liftId: 11,
            mode: "absolute",
            lifts: [{ weight: 35, reps: 10, sets: 3 }],
          },
          {
            liftId: 12,
            mode: "absolute",
            lifts: [{ weight: 10, reps: 18, sets: 3 }],
          },
          {
            liftId: 13,
            mode: "absolute",
            lifts: [{ weight: 10, reps: 10, sets: 3 }],
          },
          {
            liftId: 12,
            mode: "absolute",
            lifts: [{ weight: 20, reps: 18, sets: 3 }],
          },
          {
            liftId: 14,
            mode: "absolute",
            lifts: [{ weight: 20, reps: 10, sets: 3 }],
          },
        ],
      },
    ],
  },
];
