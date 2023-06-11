import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
/**
 * Root reducer for combining all the reducers
 */
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer
});