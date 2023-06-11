import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
/**
 * Root reducer for combining all the reducers
 * Whenever Root reducer fires the store object will be a new store object
 * whenever any of the reducer update.
 */
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer
});