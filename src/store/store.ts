import { Middleware, applyMiddleware, compose, createStore } from "redux";

/**
 * For this we need to install a separate types library which will add TS and typing to the required 
 * exports or modules or whatever inside that library. So that's very simple most libraries have @types library
 * Thye always being with @types/<name of the 3rd party library> if that's not included in the librarye as Dev dependency
 * A lot of projects due to popularity of TS will automatically install those for us. infact in package jons 
 * you can see that you have cpouple of @types/<name> libraries because CRA has installed those for us.
 */
import { logger } from "redux-logger";

import { rootReducer } from "./root-reducer";

import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ! You can only use 1 either saga or Thunk
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

// todo Step:1 create saga middleware
const sagaMiddleware = createSagaMiddleware();
/**
 * Root State type that will be used in all the selector files for declaring the Root State
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * PersistConfig to containe root state
 * along with whitelist to have keys of the Root state
 */
type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist : (keyof RootState)[] // ! this is the [] of keys in RootState.
}

// Configuration to tell redux-persist what we need to store.
const persistConfig : ExtendedPersistConfig= {
  key: "root", // name of the key in localstorage will be persist:root
  storage,
  blacklist: ["user"], // blacklist any reducer value , these will be the name of the reducer keys
  whitelist: ["cart"], // only want to store cart in local storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Array of middlewares that we want to run
 * Actions are receieved by middleware
 * DISPATCH --> Actions --> MIDDLEWARES ---> Reducer(s)
 * todo: saga added in middleware list
 */
const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware)); // ! we have to tell TS what this filter is exactly doing.
// todo afyer the above check this function is proper now and type of Middleware is returned.


// ! writing custom logger as below..
// const middlewares = [myCustomLogger];
/****
 * Compose the middlewares together
 * applyMiddleware is going to have comma separated values..
 */

// !For objects in window we have to declare global first then in that we have to add on the interface
declare global {
  // !now we will declare the interface Window and in that we can put __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  interface Window {
    //__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ is optional property that may or may not exist at client
    // reason being extension may or may not exist in browser. This is returning type of Compose function.
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));
/**
 * This has 3 arguments
 * 1. rootReducers
 * 2. iniital state which is undefined
 * 3. Composed middlewares to run before / after action is dispatched to see how the state look likes
 */
// export const store = createStore(rootReducer, undefined, composeEnhancers);
export const store = createStore(persistedReducer, undefined, composeEnhancers);

/**
 * after the store has been instantiated with saga middleware
 * we are going to run sagamiddleware with rootSaga.
 * Saga are run after the reducers are updated with triggered action.
 * todo Step 3 Run saga middleware.
 */
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
