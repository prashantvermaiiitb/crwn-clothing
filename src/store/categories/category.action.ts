import {
  Action,
  ActionWithPayload,
  createAction,
} from "../../utils/actionCreator";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

// this is an ACTION TYPE defined for fetch categories start
export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

// this is an ACTION TYPE which will be used for function that resturns {action type, categories[]}
export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

/**
 * This is a ACTION TYPE, Fetch categories failed action, this is for giving back action with payload
 * and taking CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED and Error as input.
 */
export type fetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

/**
 * Since these only 3 action types are acceptable by our reducers we have to create the UNION.
 * This has been created for the reducers.
 */
export type categoryAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | fetchCategoriesFailed;

/**
 * ! we will be doing extra operations in action creators so that they will be able to do type checking
 * ! for us, the kind of action object they receive and type of action{} they return.
 * ! action creator will generate the actions and they will also check the type of action that they hold.
 * ! for this we are going to use TYPE PRedicate is a function to see whether the argument it recieves is
 * ! a narrower type or not i.e. more specific.
 */

// type Alien = {
//   fly: () => {};
// };

// type Human = {
//   speak: () => {};
// };

// /**
//  * This function is a type checker, basically this is saying that passed in entity is of UNION types either 
//  * Alien or Human. In function body we are writing to typecast the entity to Human and then tried calling speak on that
//  * without typecasting speak would not be there on JS object (if done so will give error), hence we have to do a type cast.
//  * This function is checking that passed in entity is of Human type 'entity is Human'. This is TYPE PREDICATE and ensures that 
//  * entity i received must be Human.
//  * @param entity 
//  * @returns 
//  */
// function isHuman(entity: Human | Alien): entity is Human {
//   return (entity as Human).speak !== undefined;
// }

/**
 * Passing only the categories array
 * @param {*} categories
 * @returns
 */
export const setCategories = (categories: Category[]) => {
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
};
/**
 * todo : All these 3 are regular actions these are not thunks !!
 * todo : these are normal actions defined ???
 * This will trigger Saga.
 * @returns
 */
export const fetchCategoriesStart = (): FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

/**
 * Fetch categories success
 * @param {*} categories
 * @returns
 */
export const fetchCategoriesSuccess = (
  categories: Category[]
): FetchCategoriesSuccess =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

/**
 * When categories failed to fetch
 * @param {*} error
 * @returns
 */
export const fetchCategoriesFailed = (error: Error): fetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
