import {Lifts} from "./HardcodedDataSource";

export interface Lift {
    id: number;
    name: string;
    tm?: number;
}

export const getLiftsForUser = (userId: number) => {
    return Lifts;
}