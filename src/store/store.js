import { compose, createStore, applyMiddleware } from "redux";
import { logger } from 'redux-logger';
import { rootReducer } from "./root-reducer";
// import { myCustomLogger } from "./middlewares/custom-logger";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuration to tell redux-persist what we need to store.
const persistConfig = {
    key: 'root', // name of the key in localstorage will be persist:root
    storage,
    blacklist: ['user']// blacklist any reducer value , these will be the name of the reducer keys
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Array of middlewares that we want to run
 * Actions are receieved by middleware
 * DISPATCH --> Actions --> MIDDLEWARES ---> Reducer(s)
 */
const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);
// ! writing custom logger as below..
// const middlewares = [myCustomLogger];
/****
 * Compose the middlewares together 
 * applyMiddleware is going to have comma separated values..
 */
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));
/**
 * This has 3 arguments 
 * 1. rootReducers
 * 2. iniital state which is undefined 
 * 3. Composed middlewares to run before / after action is dispatched to see how the state look likes 
 */
// export const store = createStore(rootReducer, undefined, composeEnhancers);
export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);