import {
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  REDUCE_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_QUANTITY,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILED,
} from "../actions/types";
import {
  addItemToBasket,
  removeItemFromBasket,
  reduceItemQuantity,
  changeItemQuantity,
} from "../utils/basketUtils";

const initialState = {
  basketItems: [],
  totalAmount: 0,
  checkoutError: undefined,
  checkoutSuccess: "",
};

const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      return {
        ...state,
        basketItems: addItemToBasket(
          state.basketItems,
          action.payload,
          state.totalAmount
        ).basket,
        totalAmount: addItemToBasket(
          state.basketItems,
          action.payload,
          state.totalAmount
        ).totalAmount,
      };
    case REMOVE_PRODUCT_FROM_BASKET:
      return {
        ...state,
        basketItems: removeItemFromBasket(
          state.basketItems,
          action.payload,
          state.totalAmount
        ).basket,
        totalAmount: removeItemFromBasket(
          state.basketItems,
          action.payload,
          state.totalAmount
        ).totalAmount,
      };
    case REDUCE_PRODUCT_QUANTITY:
      return {
        ...state,
        basketItems: reduceItemQuantity(
          state.basketItems,
          action.payload,
          state.totalAmount
        ).basket,
        totalAmount: reduceItemQuantity(
          state.basketItems,
          action.payload,
          state.totalAmount
        ).totalAmount,
      };
    case CHANGE_PRODUCT_QUANTITY:
      return {
        ...state,
        basketItems: changeItemQuantity(
          state.basketItems,
          action.payload,
          state.totalAmount
        ).basket,
        totalAmount: changeItemQuantity(
          state.basketItems,
          action.payload,
          state.totalAmount
        ).totalAmount,
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        basketItems: [],
        totalAmount: 0,
        checkoutSuccess: action.payload,
      };
    case CHECKOUT_FAILED:
      return {
        ...state,
        checkoutError: action.payload,
      };
    default:
      return state;
  }
};

export default basketReducer;
