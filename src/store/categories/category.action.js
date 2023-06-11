import { createAction } from "../../utils/actionCreator";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

// redefining the setCategoriesMap with action type & payload passed.
// export const setCategoriesMap = (categoriesMap) => {
//     return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesMap);
// }


/**
 * Passing only the categories array
 * @param {*} categories 
 * @returns 
 */
export const setCategories = (categories) => {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
}