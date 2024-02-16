import { createAction } from "redux-actions";

export const bookingType = {
  STORE_BOOKING_FORM_DATA: "STORE_BOOKING_FORM_DATA",
  STORE_BOOKING_LIST: "STORE_BOOKING_LIST",
  STORE_CITY_LIST: "STORE_CITY_LIST"
};

export const STORE_BOOKING_FORM_DATA = createAction(
  bookingType.STORE_BOOKING_FORM_DATA
);

export const STORE_BOOKING_LIST = createAction(bookingType.STORE_BOOKING_LIST);

export const STORE_CITY_LIST = createAction(bookingType.STORE_CITY_LIST);
