import React from "react";
import ProductReducer from "../../reducers/products";
import { fetchProductsSuccess, fetchProductsFailed } from "../../actions/";
import { products } from "../../../shared/stubs/Products";

describe("ProductsReducer", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      productsList: [],
      productErrMsg: "",
    };
  });

  afterEach(() => {
    initialState = undefined;
  });

  it("fetches products successfully", () => {
    const action = fetchProductsSuccess(products);

    const reducer = ProductReducer(initialState, action);
    expect(reducer.productsList.length).toBe(5);
    expect(reducer.productsList[0].name).toBe("Product One");
  });

  it("fails when fetching products", () => {
    const action = fetchProductsFailed("An error occurred.");

    const reducer = ProductReducer(initialState, action);
    expect(reducer.productsList.length).toBe(0);
    expect(reducer.productErrMsg).toBe("An error occurred.");
  });
});
