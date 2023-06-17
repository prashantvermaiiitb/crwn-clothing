/**
 * configureStore  is going to take place of creatStore and Applymiddleware
 * We are not going to have the store.js because all the store functionality
 * is going to come from redux toolkit.
 */
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "./root-reducer";
import { logger } from 'redux-logger';

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

/**
 * Redux toolkit by default includes 3 middlewares 
 * 1. Redux-thunk : Promise based actions, so that we can asycn redux, by default redux toolkit ships with this.
 * 2. Non-Serializable value : Detecting whether you are storing plain object or not in redux, plain objects, strings, numbers, 
 *    can be stringified and understood, NO consturctor, function or Symbols. We can disable usage of this or we can respect it.
 * 3. Immutability Check: You cannot mutate values in your reducers. inside redux evyer thing should be a copy you cannot mutate
 *    the existing object. Like adding a property [] in state then doing sort() or assinging new value to element in array index[]
 * ! USing strict mode sa well mean that mutation is not allowed
 */

export const store = configureStore({
    reducer: rootReducer,
    // do not use default middleware pass this. by default this is redux thunk
    /**
     * todo : if we do like this we are going to override the default middlewares passed from REDUX-TOOLKIT.
     */
    // middleware: middlewares // pass an array for middleware, if we pass this then we are removing middleware passed by redux toolkit
    /**
     * todo : if we do like this wherein we pass function, then we can get back the default middleware 
     * from the redux-toolkit. This will return an function that will accept a config object for the default middlewares
     * and in turn return [] of middlewares. In that we can concatenate our custome middlewares.
     */
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        //! there can be more granular checks that could be performed within this, READ Documentation for this 
        serializableCheck: false, // this is the name of middleware 'serializableCheck'
    }).concat(middlewares)
})