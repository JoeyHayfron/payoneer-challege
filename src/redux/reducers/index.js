import { combineReducers } from "redux";
import productsReducer from "./products";
import basketReducer from "./basket";

const rootReducer = combineReducers({
  products: productsReducer,
  basket: basketReducer,
});

export default rootReducer;
