import { createAction } from "../../utils/actionCreator";
import { USER_ACTION_TYPES } from "./user.types";

// redefining the setCurrentUser with action type & payload passed.
export const setCurrentUser = (user) => {
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}
/**
 * checking user session has started 
 * @returns 
 */
export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
/**
 * Google sign-In start action
 * @returns 
 */
export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
/**
 * Email sign-In start
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
/**
 * Sign-In Success
 * @param {*} user 
 * @returns 
 */
export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
/**
 * Sign-In failed action
 * @param {*} error 
 * @returns 
 */
export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

/**
 * This will be triggered from component, hence we will be having email password & displayName.
 * @param {*} email 
 * @param {*} password 
 * @param {*} displayName 
 * @returns 
 */
export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });
/**
 * Think what we are going to get back.
 * We will be getting user and additionalDetails from REDUX SAGA after login
 * @param {*} param0 
 * @returns 
 */
export const signUpSuccess = (user, additionalDetails) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

/**
 * 
 * @param {*} error 
 * @returns 
 */
export const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_ERROR, error);

/**
 * sign out start
 * @returns 
 */
export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);
/**
 * signout success
 * @returns 
 */
export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
/**
 * signout failed
 * @param {*} error 
 * @returns 
 */
export const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);