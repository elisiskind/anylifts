import React from "react";
import { Routine } from "state/Programs";

const CurrentWorkoutContext = React.createContext<Routine | null>(null);
export const CurrentWorkoutProvider = CurrentWorkoutContext.Provider;
export const CurrentWorkoutConsumer = CurrentWorkoutContext.Consumer;
export default CurrentWorkoutContext;
