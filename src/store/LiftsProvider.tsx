import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "index";
import { CurrentUserContext } from "store/UserProvider";

export interface Lift {
  id: string;
  name: string;
  tm?: number;
}

export const LiftsContext = createContext<Lift[] | null>(null);

export const addLift = async (lift: Lift, userId: string) => {
  return db.collection("users").doc(userId).collection("lifts").add(lift);
};

const LiftsProvider: FunctionComponent = ({ children }) => {
  const { data: user } = useContext(CurrentUserContext);
  const [lifts, setLifts] = useState<Lift[] | null>(null);

  useEffect(() => {
    if (user) {
      return db
        .collection("users")
        .doc(user.id)
        .collection("lifts")
        .onSnapshot(
          (resp) => {
            setLifts(
              resp.docs.map((doc) => {
                return {
                  id: doc.id,
                  ...doc.data(),
                } as Lift;
              })
            );
          },
          (err) => {
            console.log("Error fetching lifts: " + err);
          }
        );
    } else {
      setLifts(null);
    }
  }, [user]);

  return (
    <LiftsContext.Provider value={lifts}>{children}</LiftsContext.Provider>
  );
};

export default LiftsProvider;
