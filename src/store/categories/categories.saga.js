import { all, call, put, takeLatest } from "redux-saga/effects";

import { getCategoriesAndDocuments } from '../../firebase/firebase.utils';

import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";


/**
 * fetching categories in async manner.
 */
export function* fetchCategoriesAsync() {
    try {
        /**
         * call is used to convert the function into an effect
         * call takes function and parameters to be passed to it 
         */
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        console.log("🚀 ~ file: categories.saga.js:18 ~ function*fetchCategoriesAsync ~ categoriesArray:", categoriesArray)
        /**
         * Instead of dispatch we use put to dispatch the action.
         * Now we have the categories hence dispatching the success action.
         */
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        /**
         * Incase we are receiving the error this is going to trigger.
         */
        yield put(fetchCategoriesFailed(error)); // triggered function 
    }
}

/**
 * This will be triggered when the categroies are fetched while in previous case
 * prior to fetching of the categories, hence we have not entertain
 * ed the CATEOGRIES_START action.
 * take is where we receive actions.
 * takeLatest means if you receive bunch of actions then take the latest one. 
 * If we hear the same function back-to-back again for 5 times then take the last one forgot first 4
 * todo starting action here for which action handling is not written.
 */
export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

/**
 * Accumulator function that will hold all the categories SAGA.
 * This will be a generator function.
 */
export function* categoriesSaga() {
    /**
     * todo all is an effect that is run everything inside and complete when all is complete.
     * todo takes an array that can have different generators, functions and it will wait untill all of the are complete.
     * before we continue
     * todo : Generators respond to actions ~ to reducers do inside their switch
     * As for reducers whenever action happens I would like to return action object. 
     * As for generators whenever actions happens I would like to do something with it.
     */
    yield all([call(onFetchCategories)]);// pause at this level
}