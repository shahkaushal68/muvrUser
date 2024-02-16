import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { storeAuthenticateReducer } from "./auth/auth.reducer";
import { bookingReducer } from "./booking/booking.reducer";


export const rootReducer = (history) =>
  combineReducers({
    storeHistoryReducer: connectRouter(history),
    storeAuthenticateReducer: storeAuthenticateReducer,
    bookingReducer: bookingReducer,
  });
