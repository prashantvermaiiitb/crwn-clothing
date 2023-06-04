import { createContext, useEffect, useReducer, useState } from "react";
import { createUserProfileDocument, onAuthenticationStatusChange } from "../../firebase/firebase.utils";
import { createAction } from "../../utils/actionCreator";

export const UserContext = createContext({
    /**
     * setting the initial value of the userContext object
     */
    currentUser: null,
    setCurrentUser: () => null
})

// declaring initial state for this context as below 
const INITIAL_STATE = {
    currentUser: null
}

// Declaring the action types that will be handled or dispatched
const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER '
}

// Defining the user reducer that will be handling action types
// This will be returning new state object, we are dealing with entire State{} object here
const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default:
            throw new Error(`unhandled type ${type} in User reducer`);
    }
}

/**
 * High level context provider component. 
 * This will be wrapped around a top level component that will be common to all 
 * other nodes which will need Usercontext.
 * @param {*} children -- that are to be rendered  
 * @returns 
 */
export const UserProvider = ({ children }) => {
    /**
     * state is used for getting / passing value of the context to child components
     * child components should re-render in-case they are  
     */
    // const [currentUser, setCurrentUser] = useState(null);

    //! instead of useState now we will be using useReducer to handle the state management
    // this will give us current state and dispatch function
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const { currentUser } = state; // getting the current User out of the state {}

    // redefining the setCurrentUser with action type & payload passed.
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }

    const value = { currentUser, setCurrentUser };
    useEffect(() => {
        const unsubscribe = onAuthenticationStatusChange((user) => {
            if (user) {
                createUserProfileDocument(user);
            }
            // we will be getting either user object or null 
            console.log("🚀 ~ file: user.context.jsx:28 ~ unsubscribe ~ user:", user)
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}