import { Middleware } from "redux";
import { RootState } from "../store";

/**
 * Custom logger middleware
 * @param {*} store
 * @returns
 */
export const myCustomLogger: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    /**
     * if there is no action type defined probably this is not
     * the action I will be reading hence passing this on.
     */
    if (!action.type) {
      next(action);
      return;
    }

    /**
     * Printing information in the action passed
     */
    console.log(
      "🚀 ~ file: custom-logger.js:19 ~ myCustomLogger ~ action.type:",
      action.type
    );
    console.log(
      "🚀 ~ file: custom-logger.js:20 ~ myCustomLogger ~ action.payload:",
      action.payload
    );
    console.log(
      "🚀 ~ file: custom-logger.js:21 ~ myCustomLogger ~ current state:",
      store.getState()
    );

    // calling next middleware in the row
    next(action);

    /**
     * Printing NEW state after next() is called
     */
    console.log(
      "🚀 ~ file: custom-logger.js:26 ~ myCustomLogger ~ next state:",
      store.getState()
    );
  };
