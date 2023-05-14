import { createContext, useEffect, useState } from "react";
import { createUserProfileDocument, onAuthenticationStatusChange } from "../../firebase/firebase.utils";

export const UserContext = createContext({
    /**
     * setting the initial value of the userContext object
     */
    currentUser: null,
    setCurrentUser: () => null
})

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
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    useEffect(() => {
        const unsubscribe = onAuthenticationStatusChange((user) => {
            if(user){
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