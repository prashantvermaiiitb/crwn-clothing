// Declaring the action types that will be handled or dispatched
export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = "user/SET_CURRENT_USER",
  CHECK_USER_SESSION = "user/CHECK_USER_SESSION", // checking user session
  GOOGLE_SIGN_IN_START = "user/GOOGLE_SIGN_IN_START", // checking Google sign-In start
  EMAIL_SIGN_IN_START = "user/EMAIL_SIGN_IN_START", //  checking email sign-In start
  SIGN_IN_SUCCESS = "user/SIGN_IN_SUCCESS", // checking sign-In success
  SIGN_IN_FAILED = "user/SIGN_IN_FAILED", // checking sign-In failed
  SIGN_UP_SUCCESS = "user/SIGN_UP_SUCCESS", // checking sign-Up success
  SIGN_UP_START = "user/SIGN_UP_START", // checking sign-up start
  SIGN_UP_FAILED = "user/SIGN_UP_FAILED", // checking sign-up failed
  SIGN_OUT_SUCCESS = "user/SIGN_OUT_SUCCESS", // checking sign-out success
  SIGN_OUT_START = "user/SIGN_OUT_START", // checking sign-out start
  SIGN_OUT_FAILED = "user/SIGN_OUT_FAILED", // checking sign-out failed
}
