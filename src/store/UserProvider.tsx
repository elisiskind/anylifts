import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { auth, db } from "index";
import { DataContext } from "store/utils";

interface UserContext extends DataContext<User> {
  updateUser: (
    field: string,
    value: any,
    ...moreFieldsAndValues: any[]
  ) => Promise<void>;
}

export interface ProgramIndex {
  programId: string;
  routineIndex: number;
}

interface CurrentWorkout {
  programIndex?: ProgramIndex | null;
  set?: number;
}

export const CurrentUserContext = createContext<UserContext>({
  data: null,
  loading: false,
  updateUser: async () => {},
});

export interface User {
  id: string;
  currentWorkout?: CurrentWorkout;
}

const UserProvider: FunctionComponent = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setLoggedInUser(authUser?.uid ?? null);
    });
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      setLoading(true);
      return db
        .collection("users")
        .doc(loggedInUser)
        .onSnapshot(
          (resp) => {
            const user = {
              id: loggedInUser,
              ...resp.data(),
            } as User;
            console.log("user loaded");
            setUser(user);
            setLoading(false);
          },
          (err) => {
            setLoading(false);
            console.log("Error fetching user: " + err);
          }
        );
    } else {
      setLoading(false);
      setUser(null);
    }
  }, [loggedInUser]);

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

  return (
    <CurrentUserContext.Provider value={{ data: user, updateUser, loading }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default UserProvider;
