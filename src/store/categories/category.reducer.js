import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false, // telling that we have not loaded the categories data
    error: null // Error to be tracked since we are doing Error handling
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            console.log('**** CATEGORIES REDUCER CALLED ****');
            return { ...state, isLoading: true }; //beginning our API reponse
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return { ...state, isLoading: false, error: payload }; //API failed to give reponse
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            console.log('**** CATEGORIES REDUCER SUCCESS CALLED AFTER SAGA****');
            return { ...state, isLoading: false, categories: payload };// setting categories only after success
        default: return state;
    }
}