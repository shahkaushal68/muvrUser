import { handleActions } from "redux-actions";
import { authType } from "./auth.const";

const initialState = {
  userDetails: null,
  authUserDetails: null,
  changeUserDetails: null,
};

export const storeAuthenticateReducer = handleActions(
  {
    [authType.STORE_AUTH_USER]: (state, action) => {
      return {
        ...state,
        userDetails: action.payload,
      };
    },
    [authType.STORE_AUTH_USER_DETAIL]: (state, action) => {
      return {
        ...state,
        authUserDetails: action.payload,
      };
    },
    [authType.STORE_AUTH_USER_CHANGE_DETAILS]: (state, action) => {
      return {
        ...state,
        changeUserDetails: action.payload,
      };
    },
  },
  initialState
);
