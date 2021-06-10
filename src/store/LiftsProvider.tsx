import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "index";
import { UserContext } from "store/UserProvider";

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
  const user = useContext(UserContext);
  const [lifts, setLifts] = useState<Lift[] | null>(null);
  const [cancelSubscription, setCancelSubscription] = useState<
    (() => void) | null
  >(null);

  useEffect(() => {
    if (cancelSubscription) {
      // cancelSubscription();
    }

    if (user) {
      const cancelSubscriptionFunction = db
        .collection("users")
        .doc(user!.id!)
        .collection("lifts")
        .onSnapshot(
          (resp) => {
            console.log("Setting lifts!");
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
            console.log(err);
          }
        );

      // setCancelSubscription(cancelSubscriptionFunction);
    } else {
      setLifts(null);
      setCancelSubscription(null);
    }
  }, [cancelSubscription, user]);

  return (
    <LiftsContext.Provider value={lifts}>{children}</LiftsContext.Provider>
  );
};

export default LiftsProvider;
