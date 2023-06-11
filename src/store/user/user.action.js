import { createAction } from "../../utils/actionCreator";
import { USER_ACTION_TYPES } from "./user.types";

// redefining the setCurrentUser with action type & payload passed.
export const setCurrentUser = (user) => {
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}