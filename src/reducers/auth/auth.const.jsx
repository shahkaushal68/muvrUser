import { createAction } from "redux-actions";

export const authType = {
  STORE_AUTH_USER: "STORE_AUTH_USER",
  STORE_AUTH_USER_DETAIL: "STORE_AUTH_USER_DETAIL",
  STORE_AUTH_USER_CHANGE_DETAILS: "STORE_AUTH_USER_CHANGE_DETAILS",
};
export const STORE_AUTH_USER = createAction(authType.STORE_AUTH_USER);
export const STORE_AUTH_USER_DETAIL = createAction(
  authType.STORE_AUTH_USER_DETAIL
);
export const STORE_AUTH_USER_CHANGE_DETAILS = createAction(
  authType.STORE_AUTH_USER_CHANGE_DETAILS
);
