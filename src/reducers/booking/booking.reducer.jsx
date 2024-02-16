import { handleActions } from "redux-actions";
import { bookingType } from "./booking.const";

const initialState = {
  bookingCreateFormData: null,
  bookingList: [],
  cityList: []
};

export const bookingReducer = handleActions(
  {
    [bookingType.STORE_BOOKING_FORM_DATA]: (state, action) => {
      return {
        ...state,
        bookingCreateFormData: action.payload,
      };
    },
    [bookingType.STORE_BOOKING_LIST]: (state, action) => {
      return {
        ...state,
        bookingList: action.payload,
      };
    },
    [bookingType.STORE_CITY_LIST]: (state, action) => {
      return {
        ...state,
        cityList: action.payload,
      };
    },
  },
  initialState
);
