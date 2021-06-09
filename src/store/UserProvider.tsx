import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { auth } from "index";

export const UserContext = createContext<User | null>(null);

export interface User {
  id: string;
}

const UserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setUser(
        authUser && {
          id: authUser?.uid!,
        }
      );
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
