import { all, call, put, takeLatest } from "typed-redux-saga/macro";
/**
 * macro is a standard defined by babel for 3rd  party to define the interfaces in a way that
 * babel can use this library to transpile this code.
 * Babel will not use it's transpiler and rely on this version of the library for transpiling the code
 * This plugin is unique to their library.
 */

import { USER_ACTION_TYPES } from "./user.types";

import { User, signInWithEmailAndPassword } from "firebase/auth";
import {
  AdditionalData,
  auth,
  createUserProfileDocument,
  customCreateUserWithEmailAndPassword,
  getCurrentUser,
  signInWithGoogle2,
  signOutUser,
} from "../../firebase/firebase.utils";
import {
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "./user.action";

export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalData
) {
  try {
    /**
     * todo anywhere you want to make call to generators use 'call'
     * these are effect generators which is an object that tell what's going to happen.
     */
    const userSnapshot = yield* call(
      createUserProfileDocument,
      userAuth,
      additionalDetails
    );
    // console.log(
    //   "🚀 ~ file: user.saga.js:16 ~ function*getSnapShotFromUserAuth ~ userAuth:",
    //   userSnapshot,
    //   userSnapshot.data();
    // );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

/**
 * Generator / Saga to check if user is present or not
 * This will call another saga to create the user object
 * @returns
 */
export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return; // if we are not having any user auth object return
    //
    yield* call(getSnapShotFromUserAuth, userAuth);
    // else call a saga that will create the User
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
/**
 * This function will trigger the Sign in with Google popup
 */
export function* signInWithGoogleSaga() {
  try {
    //!todo promise version created for this
    const user = yield* call(signInWithGoogle2);
    console.log(
      "🚀 ~ file: user.saga.js:46 ~ function*signInWithGoogleSaga ~ user *** :",
      user
    );
    yield* call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmailAndPasswordSaga({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    //!todo auth needs to be included to make this work
    const response = yield* call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );
    console.log(
      "🚀 ~ file: user.saga.js:58 ~ function*signInWithEmailAndPasswordSaga ~ response:",
      response
    );
    if (response) {
      const { user } = response;
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

/**
 * Entry point saga for Email sign In
 * This will be hooked with REDUX SAGA
 * This will be used to support SignIn with Email/pwd
 */
export function* onEmailSignInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPasswordSaga
  );
}

/**
 * Entry point for Google Sign In start
 * This will be hooked in REDUX SAGA
 * Inorder to launch Google SignIn Start action we have to dispatch this action
 * we will do that in our signIn form.
 */
export function* onGoogleSignInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
    signInWithGoogleSaga
  );
}

/**
 * Action saga to check if the user session has been started ?
 */
export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signUpSaga({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const { user } = yield* call(
      customCreateUserWithEmailAndPassword,
      auth,
      email,
      password
    );
    // signup success is not for reducers it's for our users saga
    // we will be creating another entry saga for signUp success
    yield* put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

/**
 * Generator for handling signIn after SignUp
 * This is going to recieve the actions that we have made for the signUp success
 * payload for the user and additional details will be received.
 */
export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapShotFromUserAuth, user, additionalDetails);
}

/**
 * Entry saga for signUp success
 */
export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

/**
 * Entry point for the signUp function
 */
export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpSaga);
}

export function* onSignOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, onSignOut);
}

/**
 * Aggregator function for User saga
 */
export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
