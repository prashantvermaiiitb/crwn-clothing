import { compose, createStore, applyMiddleware } from "redux";
import { logger } from 'redux-logger';
import { rootReducer } from "./root-reducer";
import { myCustomLogger } from "./middlewares/custom-logger";

/**
 * Array of middlewares that we want to run
 * Actions are receieved by middleware
 * DISPATCH --> Actions --> MIDDLEWARES ---> Reducer(s)
 */
// const middlewares = [logger, myCustomLogger];
const middlewares = [myCustomLogger];
/****
 * Compose the middlewares together 
 * applyMiddleware is going to have comma separated values..
 */
const composeEnhancers = compose(applyMiddleware(...middlewares));
/**
 * This has 3 arguments 
 * 1. rootReducers
 * 2. iniital state which is undefined 
 * 3. Composed middlewares to run before / after action is dispatched to see how the state look likes 
 */
export const store = createStore(rootReducer, undefined, composeEnhancers);