import { getCategoriesAndDocuments } from "../../firebase/firebase.utils";
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

/**
 * todo : All these 3 are regular actions these are not thunks !! 
 * todo : these are normal actions defined ??? 
 * @returns 
 */
export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
export const fetchCategoriesSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

/**
 * Redux thunk for fetching the categories in async manner.
 * todo: This will be return an async function that has dispatch in it as param.
 * todo: whether request fail or pass this will remain here in this component.
 * todo: this is a far more granular approach and separation of concerns.
 * todo: component simply consumes data and shows data.
 * todo: this is done with large scale projects to extract out async behvaiour.
 * todo : i want an action that's async way and all I wanted to have access to is dispatch
 * @param {*} dispatch  
 */
export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart()); // triggered function 
    try {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(fetchCategoriesSuccess(categoriesArray)); // triggered function 
    } catch (error) {
        dispatch(fetchCategoriesFailed(error)); // triggered function 
    }
}