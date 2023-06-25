import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

/**
 * We have to create multiple input & output selectors.
 * Input selector gives us parameters that will be used to determine what our output should be.
 */

// todo Step:1 Creating initial Selector gives us slice of reducer we need further
/**
 * We want to return bacl CategoriesState object from the selector.
 * @param state
 * @returns
 */
const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

// todo Step:2 Next we need to work on slice of Reducer returned above
// todo will take 2 params
// 1. in [] array of input selector
// 2. fn - output selector
export const selectCategories = createSelector(
  // params that we need to return output selector, what are slices we want from redux.
  [selectCategoryReducer],
  // This is a memoised selector, it will only run only when
  // reducer returns a different slice. Prior to this run === to see what's in cache is similar to categories
  // returned from present in reducer
  (categoriesSlice) => categoriesSlice.categories
);

/**
 * Returning back categories map from the state
 * as long as categories array does not change do not run this method.
 * @param {*} state
 * @returns
 */
export const getCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => {
    return categories.reduce((acc, category) => {
      // console.log('******** USE selector for Categories Called *****');
      const { title, items } = category; // regain data in the document
      acc[title.toLowerCase()] = items;
      return acc;
      // type-casting and telling TS that return type will be categoryItem[]
      // type-casting is overriding the type, essentially you do not do.
      // but since we know that this is a category map this is a safe place to do that.
    }, {} as CategoryMap);
  }
);
/**
 * Extract isLoading from the categories slice from reducer.
 */
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
