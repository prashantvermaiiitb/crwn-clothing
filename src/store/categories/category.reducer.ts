import { AnyAction } from "redux";
import {
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "./category.action";
import { Category } from "./category.types";

/**
 * readonly means this cannot be modified, since this is an state object
 * we always create new object.
 */
export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false, // telling that we have not loaded the categories data
  error: null, // Error to be tracked since we are doing Error handling
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  /**
   * means the action you receive is one of the 3 action types. this pattern is a discriminating Union.
   * because reducer only knows 3 types of actions and if any other type is called inside reducer, error will be thrown.
   * If we directly try action:categoryAction then will not be able to define {} as default value.
   */

  /**
   * ! Here if we comment out the default case then as well TS will not give error because as per TS we are
   * ! handling all the use-case, but if we comment the default use-case and try to run then there are certain
   * ! actions that will be passed to this reducer that will result in undefined and hence we will be getting
   * ! error, So to avoid this use-case we have to do away with this UNION of the type categoryAction. so we
   * ! will be creating Action type gurards for this. this will be done by defining methods on the function.
   */
  // action = {} as categoryAction
  action: AnyAction
) => {
  /**
   * since we are having actions that are not having payload so this error is appearing which is correct
   * hence we  will comment out this statement.
   */
  //   const { type, payload } = action;
  //   switch (type) {
  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     console.log("**** CATEGORIES REDUCER CALLED ****");
  //     return { ...state, isLoading: true }; //beginning our API reponse
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     //   return { ...state, isLoading: false, error: payload }; //API failed to give reponse
  //     /**
  //      * TS knows that when this action type is processed then there is a payload present.
  //      */
  //     return { ...state, isLoading: false, error: action.payload }; //getting it directly from the payload becuase it's not there in some action
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     console.log("**** CATEGORIES REDUCER SUCCESS CALLED AFTER SAGA****");
  //     //   return { ...state, isLoading: false, categories: payload }; // setting categories only after success
  //     /**
  //      * TS knows that when this action type is processed then there is a payload present.
  //      * This is the benefit TS that we get by creating the unon of action types and TS will narrow down the type by itself
  //      */
  //     return { ...state, isLoading: false, categories: action.payload }; //getting it directly from the payload becuase it's not there in some action
  //   default:
  //     return state;
  // }

  /**
   * ! now we are making the function calls to have exact fetchCategories actions rather than categoryAction
   * ! so insetad of switch statement we are now using if-else statement.this is much more proper version of reducer and clariy
   */
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, isLoading: false, error: action.payload }; //getting it directly from the payload becuase it's not there in some action
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, isLoading: false, categories: action.payload }; //getting it directly from the payload becuase it's not there in some action
  }

  return state;
};
