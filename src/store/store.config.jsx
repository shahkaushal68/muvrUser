import { configureStore } from "@reduxjs/toolkit";
import { appConfig } from "../config";
import { createBrowserHistory } from "history";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router";
import { rootReducer } from "../reducers";

export const history = createBrowserHistory();
export const routerMiddleware = createRouterMiddleware(history);

const middlewareList = [routerMiddleware];

export const store = configureStore({
  reducer: rootReducer(history),
  middleware: [...middlewareList],
  devTools: appConfig.APP_MODE === "development",
});
