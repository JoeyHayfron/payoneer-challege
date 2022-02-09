import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
} from "../actions/types";

const initialState = {
  productsList: [],
  productErrMsg: "",
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, productsList: action.payload };
    case FETCH_PRODUCTS_FAILED:
      return { ...state, productErrMsg: action.payload };
    default:
      return state;
  }
};

export default productsReducer;
