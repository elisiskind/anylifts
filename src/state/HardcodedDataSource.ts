import { ProgramData } from "./Programs";
import { Lift } from "./Lifts";

export const Lifts: Lift[] = [
  {
    name: "Bench Press",
    id: 1,
    tm: 155,
  },
  {
    name: "Squat",
    id: 2,
    tm: 205,
  },
  {
    name: "Deadlift",
    id: 3,
    tm: 195,
  },
  {
    name: "Overhead Press",
    id: 4,
    tm: 95,
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
  {
    name: "Romanian Deadlift",
    id: 15,
    tm: 30,
  },
  {
    name: "Front Squat",
    id: 16,
    tm: 30,
  },
  {
    name: "Jump Tuck",
    id: 17,
  },
  {
    name: "Burpee",
    id: 18,
  },
  {
    name: "Dumbbell Shoulder Press",
    id: 19,
  },
];

export const Programs: ProgramData[] = [
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
      {
        name: "Legs 1",
        groups: [
          {
            liftId: 2,
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
            liftId: 15,
            mode: "absolute",
            lifts: [{ weight: 90, reps: 10, sets: 3 }],
          },
          {
            liftId: 16,
            mode: "absolute",
            lifts: [{ weight: 50, reps: 10, sets: 3 }],
          },
          {
            liftId: 17,
            mode: "absolute",
            lifts: [{ weight: 10, reps: 10, sets: 3 }],
          },
        ],
      },
      {
        name: "Pull 2",
        groups: [
          {
            liftId: 3,
            mode: "percent",
            lifts: [
              { weight: 40, reps: 5 },
              { weight: 50, reps: 5 },
              { weight: 60, reps: 5 },
              { weight: 70, reps: 3 },
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
        name: "Push 2",
        groups: [
          {
            liftId: 4,
            mode: "percent",
            lifts: [
              { weight: 50, reps: 5 },
              { weight: 60, reps: 5 },
              { weight: 70, reps: 5 },
              { weight: 80, reps: 3 },
              { weight: 85, reps: 5, sets: 4 },
              { weight: 85, reps: 5, amrap: true },
            ],
          },
          {
            liftId: 1,
            mode: "percent",
            lifts: [{ weight: 60, reps: 10, sets: 3 }],
          },
          {
            liftId: 11,
            mode: "absolute",
            lifts: [{ weight: 30, reps: 10, sets: 3 }],
          },
          {
            liftId: 12,
            mode: "absolute",
            lifts: [{ weight: 5, reps: 18, sets: 3 }],
          },
          {
            liftId: 13,
            mode: "absolute",
            lifts: [{ weight: 10, reps: 10, sets: 3 }],
          },
          {
            liftId: 12,
            mode: "absolute",
            lifts: [{ weight: 5, reps: 18, sets: 3 }],
          },
          {
            liftId: 14,
            mode: "absolute",
            lifts: [{ weight: 20, reps: 10, sets: 3 }],
          },
        ],
      },
      {
        name: "Legs 2",
        groups: [
          {
            liftId: 2,
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
            liftId: 15,
            mode: "absolute",
            lifts: [{ weight: 90, reps: 10, sets: 3 }],
          },
          {
            liftId: 16,
            mode: "absolute",
            lifts: [{ weight: 50, reps: 10, sets: 3 }],
          },
          {
            liftId: 17,
            mode: "absolute",
            lifts: [{ weight: 10, reps: 10, sets: 3 }],
          },
        ],
      },
    ],
  },
  {
    name: "4 Day Split",
    id: 2,
    routines: [
      {
        name: "Legs 1",
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
            liftId: 15,
            mode: "absolute",
            lifts: [{ weight: 90, reps: 10, sets: 3 }],
          },
          {
            liftId: 17,
            mode: "absolute",
            lifts: [{ weight: 0, reps: 10, sets: 3 }],
          },
          {
            liftId: 18,
            mode: "absolute",
            lifts: [{ weight: 0, reps: 10, sets: 3 }],
          },
        ],
      },
      {
        name: "Upper Body 1",
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
            liftId: 6,
            mode: "percent",
            lifts: [{ weight: 100, reps: 10, sets: 3 }],
          },
          {
            liftId: 19,
            mode: "absolute",
            lifts: [{ weight: 35, reps: 10, sets: 3 }],
          },
          {
            liftId: 8,
            mode: "absolute",
            lifts: [{ weight: 10, reps: 10, sets: 3 }],
          },
          {
            liftId: 10,
            mode: "absolute",
            lifts: [{ weight: 20, reps: 10, sets: 3 }],
          },
        ],
      },
      {
        name: "Legs 2",
        groups: [
          {
            liftId: 17,
            mode: "absolute",
            lifts: [{ weight: 0, reps: 10, sets: 2 }],
          },
          {
            liftId: 16,
            mode: "absolute",
            lifts: [{ weight: 70, reps: 10, sets: 3 }],
          },
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
            liftId: 17,
            mode: "absolute",
            lifts: [{ weight: 0, reps: 10, sets: 3 }],
          },
          {
            liftId: 18,
            mode: "absolute",
            lifts: [{ weight: 0, reps: 10, sets: 3 }],
          },
        ],
      },
      {
        name: "Upper Body 2",
        groups: [
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
          {
            liftId: 1,
            mode: "percent",
            lifts: [{ weight: 65, reps: 10, sets: 3 }],
          },
          {
            liftId: 5,
            mode: "percent",
            lifts: [{ weight: 60, reps: 10, sets: 3 }],
          },
          {
            liftId: 13,
            mode: "absolute",
            lifts: [{ weight: 30, reps: 10, sets: 3 }],
          },
          {
            liftId: 12,
            mode: "absolute",
            lifts: [{ weight: 10, reps: 10, sets: 3 }],
          },
        ],
      },
    ],
  },
];
