import { USER_ACTION_TYPES } from "./user.types";

// declaring initial state for this context as below 
const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

// Defining the user reducer that will be handling action types
// This will be returning new state object, we are dealing with entire State{} object here
// ! since we are not having any hook here so we have to assign initial state value hence assigned.

// ! every reducer will get every action and we have to return the default state when we are not planning 
// ! to listen to that passed in action.
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload };
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null };
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload };
        default:
            return state; // {...state}
    }
}  