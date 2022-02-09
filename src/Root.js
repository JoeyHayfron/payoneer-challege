import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux/reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const Root = ({ children, store, initialState }) => {
  const appStore = store
    ? store
    : createStore(
        reducers,
        (initialState = {}),
        composeWithDevTools(applyMiddleware(thunk))
      );
  return <Provider store={appStore}>{children}</Provider>;
};

export default Root;
