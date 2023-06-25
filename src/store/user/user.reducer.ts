import { AnyAction } from "redux";
import { UserData } from "../../firebase/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

// declaring initial state for this context as below
/**
 * readonly will prevent usage of state like
 * INITIAL_STATE.currentUser= {name:'abc',... } inside the reducer
 */
const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// Defining the user reducer that will be handling action types
// This will be returning new state object, we are dealing with entire State{} object here
// ! since we are not having any hook here so we have to assign initial state value hence assigned.
// ! every reducer will get every action and we have to return the default state when we are not planning
// ! to listen to that passed in action.
export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }

  return state;
};
