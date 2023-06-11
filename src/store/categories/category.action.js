import { createAction } from "../../utils/actionCreator";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

// redefining the setCategoriesMap with action type & payload passed.
export const setCategoriesMap = (categoriesMap) => {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
}