import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { auth, db } from "index";
import {
  CurrentRoutineData,
  CurrentSetData,
  deserialize,
  ProgramData,
  UserData,
} from "store/Entities";
import { CurrentRoutine, Lift, Program, Template } from "store/Models";
import {
  Loadable,
  loaded,
  loadedValue,
  LOADING,
  parsePrograms,
  parseRoutine,
} from "store/utils";

interface CurrentRoutineStorage {
  currentRoutine: Loadable<CurrentRoutine | null>;
  nextSet: () => Promise<void>;
  previousSet: () => Promise<void>;
  restart: () => Promise<void>;
  finish: () => Promise<void>;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Storage {
  user: Loadable<User | null>;
  programs: Program[];
  lifts: Lift[];
  currentRoutine: CurrentRoutineStorage;
  selectCurrentRoutineIndex: (
    programIndex: CurrentRoutineData | null
  ) => Promise<void>;
  userLoading: boolean;
  loading: boolean;
  editProgram: () => Promise<void>;
}

export const StorageContext = createContext<Storage>({} as Storage);

const StorageProvider: FunctionComponent = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<Loadable<string> | null>(
    LOADING
  );
  const [userData, setUserData] = useState<Loadable<UserData> | null>(LOADING);
  const [lifts, setLifts] = useState<Loadable<Lift[]>>(LOADING);
  const [templates, setTemplates] = useState<Loadable<Template[]>>(LOADING);
  const [programData, setProgramData] = useState<Loadable<ProgramData[]>>(
    LOADING
  );

  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentRoutine, setCurrentRoutine] = useState<
    Loadable<CurrentRoutine | null>
  >(LOADING);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setLoggedInUser(authUser?.uid ?? null);
    });
  }, []);

  const updateUser = async (
    field: string,
    value: any,
    ...moreFieldsAndValues: any[]
  ): Promise<void> => {
    if (loggedInUser) {
      await db
        .collection("users")
        .doc(loggedInUser)
        .update(field, value, ...moreFieldsAndValues)
        .catch((err) => {
          console.log("Error updating user: " + err);
        });
    }
  };

  const loadUser = (userId: string) => {
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot(
        (resp) => {
          const user = {
            ...resp.data(),
          } as UserData;
          console.log("user loaded");
          setUserData(user);
        },
        (err) => {
          console.log("Error fetching user: " + err);
        }
      );
  };

  const loadLifts = (userId: string) => {
    return db
      .collection("users")
      .doc(userId)
      .collection("lifts")
      .onSnapshot(
        (resp) => setLifts(resp.docs.map((doc) => deserialize(doc))),
        (err) => console.log("Error fetching lifts: " + err)
      );
  };

  const loadTemplates = (userId: string) => {
    return db
      .collection("users")
      .doc(userId)
      .collection("templates")
      .onSnapshot(
        (resp) => setTemplates(resp.docs.map((doc) => deserialize(doc))),
        (err) => console.log("Error fetching templates: " + err)
      );
  };

  const loadPrograms = (userId: string) => {
    return db
      .collection("users")
      .doc(userId)
      .collection("programs")
      .onSnapshot(
        (resp) => {
          setProgramData(
            resp.docs.map(
              (doc): ProgramData => {
                return deserialize(doc);
              }
            )
          );
        },
        (err) => {
          console.log("Error fetching programs: " + err);
        }
      );
  };

  const selectCurrentRoutine = async (
    currentRoutineIndex: CurrentRoutineData | null
  ) => {
    await updateUser("currentWorkout.currentRoutineIndex", currentRoutineIndex);
  };

  const selectCurrentSet = async (currentSet: CurrentSetData | null) => {
    await updateUser("currentWorkout.currentSet", currentSet);
  };

  useEffect(() => {
    if (loggedInUser) {
      return loadUser(loggedInUser);
    } else {
      setUserData(null);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser) {
      return loadLifts(loggedInUser);
    } else {
      setLifts([]);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser) {
      return loadTemplates(loggedInUser);
    } else {
      setTemplates([]);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser) {
      return loadPrograms(loggedInUser);
    } else {
      setPrograms([]);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (userData && loaded(userData)) {
      const parsedPrograms = parsePrograms(
        loadedValue(programData),
        loadedValue(templates),
        loadedValue(lifts)
      );
      setPrograms(parsedPrograms);
      setCurrentRoutine(parseRoutine(parsedPrograms, userData));
    }
  }, [programData, lifts, templates, userData]);

  const updateSet = async (operation: "NEXT" | "PREVIOUS" | "RESTART") => {
    if (loaded(userData) && loaded(currentRoutine)) {
      const setIndex = userData?.currentWorkout?.currentSet?.setIndex;
      const sets = currentRoutine?.sets;
      let nextSetIndex = null;

      if (setIndex && sets) {
        if (operation === "NEXT" && setIndex < sets.length - 1) {
          nextSetIndex = setIndex + 1;
        } else if (operation === "PREVIOUS" && setIndex > 0) {
          nextSetIndex = setIndex - 1;
        } else if (operation === "RESTART") {
          nextSetIndex = 0;
        }
      }

      if (nextSetIndex) {
        await selectCurrentSet({
          startTime: new Date().getUTCMilliseconds(),
          setIndex: nextSetIndex,
        });
      }
    }
  };

  const currentRoutineStorage: CurrentRoutineStorage = {
    currentRoutine: currentRoutine,
    nextSet: () => updateSet("NEXT"),
    previousSet: () => updateSet("PREVIOUS"),
    restart: () => updateSet("RESTART"),
    finish: async () => {
      setCurrentRoutine("LOADING");
      await Promise.all([
        selectCurrentSet({
          setIndex: 0,
          startTime: new Date().getUTCMilliseconds(),
        }),
        selectCurrentRoutine(null),
      ]);
    },
  };

  return (
    <StorageContext.Provider
      value={{
        user: loaded(userData)
          ? userData
            ? {
                email: loggedInUser ?? "",
                name: userData.displayName,
                avatar: userData.avatarUrl,
              }
            : null
          : "LOADING",
        userLoading:
          !loaded(loggedInUser) || (!!loggedInUser && !loaded(userData)),
        programs,
        lifts: loaded(lifts) ? lifts : [],
        editProgram: async () => {},
        currentRoutine: currentRoutineStorage,
        selectCurrentRoutineIndex: selectCurrentRoutine,
        loading:
          !loaded(loggedInUser) ||
          !loaded(userData) ||
          !loaded(lifts) ||
          !loaded(templates) ||
          !loaded(programData),
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
