import { createSlice } from "@reduxjs/toolkit";
// import { USER_ACTION_TYPES } from "./user.types";

// declaring initial state for this context as below 
const INITIAL_STATE = {
    currentUser: null,
    test: [1, 2, 3]
}

/**
 * Method to create a user Reducer combined with actions.
 * This will create the actions as well as the action types alongwith reducer.
 * so we do not have to create our own action types this will be handled by redux toolkit.  
 * From this we will be able to extract out both 
 * Reducer 
 * Actions 
 */
export const userSlice = createSlice({
    // todo what you going to name this slice.
    // todo it also namespaces the actions for us 
    name: 'user', // this is the name space for the actions under which this action fires
    initialState: INITIAL_STATE, // assigning the initial state for the reducer 
    // switch statements are nested under reducers which are present under SWITCH statements previously
    reducers: {
        //Here we are defining name of reducer function representing the action that updates the userslice of the user reducer state.
        // state is the current state 
        // action is every action that passes through store
        /**
         * so any new action you try to create here will generate new action type and action creator
         * that you can destructure and use. So createSlice has reduced our need to generate 3 files
         * actions, types & reducers to one file. 
         * @param {*} state 
         * @param {*} action 
         */
        setCurrentUser(state, action) {
            //Under the hood redux toolkit is generating a new state object 
            // similar to what we are doing with {...state,currentUser:payload} by using library called Immer
            // this is making code readable, You depend upon redux toolkit library to generate brand new state object.
            // This has generated a SLICE that replaces action types , action and reducer.
            // this is mutation with assumption that redux toolkit is going to handle immuntability.
            state.currentUser = action.payload;
        }
    }
});

// This is the reducer extracted out from the userSlice.
export const userReducer = userSlice.reducer;

// This the action that will be now derived from redux tool kit 
// This will be extracted from the actions namespace.
// Pull off the actions that we are need from the userSlice.
export const { setCurrentUser } = userSlice.actions;




// Defining the user reducer that will be handling action types
// This will be returning new state object, we are dealing with entire State{} object here
// ! since we are not having any hook here so we have to assign initial state value hence assigned.

// ! every reducer will get every action and we have to return the default state when we are not planning 
// ! to listen to that passed in action.
// export const userReducer = (state = INITIAL_STATE, action) => {
//     const { type, payload } = action;
//     switch (type) {
//         case USER_ACTION_TYPES.SET_CURRENT_USER:
//             return { ...state, currentUser: payload };
//         default:
//             return state; // {...state}
//     }
// }  