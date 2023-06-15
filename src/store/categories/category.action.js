import { createAction } from "../../utils/actionCreator";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

/**
 * Passing only the categories array
 * @param {*} categories 
 * @returns 
 */
export const setCategories = (categories) => {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
}

/**
 * todo : All these 3 are regular actions these are not thunks !! 
 * todo : these are normal actions defined ???
 * This will trigger Saga. 
 * @returns 
 */
export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

/**
 * Fetch categories success
 * @param {*} categories 
 * @returns 
 */
export const fetchCategoriesSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

/**
 * When categories failed to fetch
 * @param {*} error 
 * @returns 
 */
export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);