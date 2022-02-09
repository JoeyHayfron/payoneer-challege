import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  REDUCE_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_QUANTITY,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILED,
} from "./types";
import {
  getProducts,
  checkout,
} from "../../BasketNodeServer/client_utils/esmodules/basket_server_api";

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const fetchProductsFailed = (errMessage) => {
  return {
    type: FETCH_PRODUCTS_FAILED,
    payload: errMessage,
  };
};

export const addItemToBasket = (item) => {
  return {
    type: ADD_PRODUCT_TO_BASKET,
    payload: item,
  };
};

export const removeProductFromBasket = (item) => {
  return {
    type: REMOVE_PRODUCT_FROM_BASKET,
    payload: item,
  };
};

export const reduceProductQuantity = (item) => {
  return {
    type: REDUCE_PRODUCT_QUANTITY,
    payload: item,
  };
};

export const changeProductQuantity = (item) => {
  return {
    type: CHANGE_PRODUCT_QUANTITY,
    payload: item,
  };
};

export const checkoutSuccess = (checkoutMsg) => {
  return {
    type: CHECKOUT_SUCCESS,
    payload: checkoutMsg,
  };
};

export const checkoutFailed = (errMsg) => {
  return {
    type: CHECKOUT_FAILED,
    payload: errMsg,
  };
};

export const fetchProductsAsync = () => {
  return async (dispatch) => {
    const response = await getProducts();
    if (response) {
      dispatch(fetchProductsSuccess(response));
    } else {
      dispatch(fetchProductsFailed("An error occurred please try again"));
    }
  };
};

export const proceedToCheckOutAsync = (basketData) => {
  return async (dispatch) => {
    const response = await checkout(basketData);
    if (response) {
      dispatch(checkoutSuccess(response.msg));
    } else {
      dispatch(
        checkoutFailed("An error occurred during checkout try again later.")
      );
    }
  };
};
