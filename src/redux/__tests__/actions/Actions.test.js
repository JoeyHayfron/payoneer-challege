import React from "react";
import {
  fetchProductsSuccess,
  fetchProductsFailed,
  addItemToBasket,
  removeProductFromBasket,
  reduceProductQuantity,
  changeProductQuantity,
  checkoutSuccess,
  checkoutFailed,
  fetchProductsAsync,
} from "../../actions/";
import { products } from "../../../shared/stubs/Products";
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  REDUCE_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_QUANTITY,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILED,
} from "../../actions/types";

describe("Testing Actions", () => {
  let item;
  beforeEach(() => {
    item = { sku: 1, quantity: 2 };
  });
  afterEach(() => {
    item = null;
  });
  it("returns object with products payload", () => {
    const action = fetchProductsSuccess(products);
    expect(action).toStrictEqual({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: products,
    });
  });

  it("returns object with product error message", () => {
    const action = fetchProductsFailed("Error occurred");
    expect(action).toStrictEqual({
      type: FETCH_PRODUCTS_FAILED,
      payload: "Error occurred",
    });
  });

  it("returns object with single basket item", () => {
    const action = addItemToBasket(item);
    expect(action).toStrictEqual({
      type: ADD_PRODUCT_TO_BASKET,
      payload: item,
    });
  });

  it("returns object with product to remove as payload", () => {
    const action = removeProductFromBasket(item);
    expect(action).toStrictEqual({
      type: REMOVE_PRODUCT_FROM_BASKET,
      payload: item,
    });
  });

  it("returns object with product to reduce as payload", () => {
    const action = reduceProductQuantity(item);
    expect(action).toStrictEqual({
      type: REDUCE_PRODUCT_QUANTITY,
      payload: item,
    });
  });

  it("returns object with new product quantity as payload", () => {
    const action = changeProductQuantity(item);
    expect(action).toStrictEqual({
      type: CHANGE_PRODUCT_QUANTITY,
      payload: item,
    });
  });

  it("returns object with success checkout message", () => {
    const action = checkoutSuccess("Checkout Successful");
    expect(action).toStrictEqual({
      type: CHECKOUT_SUCCESS,
      payload: "Checkout Successful",
    });
  });

  it("returns object with error checkout message", () => {
    const action = checkoutFailed("An error occurred");
    expect(action).toStrictEqual({
      type: CHECKOUT_FAILED,
      payload: "An error occurred",
    });
  });
});
