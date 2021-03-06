import { combineReducers } from "redux";
import { FirebaseReducer, firebaseReducer } from "react-redux-firebase";
import { FirestoreReducer, firestoreReducer } from "redux-firestore";

export interface State {
  firebase: FirebaseReducer.Reducer;
  firestore: FirestoreReducer.Reducer;
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
