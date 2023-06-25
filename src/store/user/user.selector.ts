import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "../store";

export const selectCurrentUser = (state: RootState): UserState => state.user;

export const currentUserSelector = createSelector(
  selectCurrentUser,
  (user) => user.currentUser
);
