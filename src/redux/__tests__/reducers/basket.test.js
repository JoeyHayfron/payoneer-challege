import Rect from "react";
import BasketReducer from "../../reducers/basket";
import {
  addItemToBasket,
  removeProductFromBasket,
  reduceProductQuantity,
  changeProductQuantity,
  checkoutSuccess,
  checkoutFailed,
} from "../../actions/";
import { products } from "../../../shared/stubs/Products";
import { basket } from "../../../shared/stubs/Basket";

describe("BasketReducer", () => {
  it("adds product to basket items", () => {
    const action = addItemToBasket(products[0]);
    const initialState = {
      basketItems: [],
      totalAmount: 0,
      checkoutError: undefined,
      checkoutSuccess: "",
    };
    const reducer = BasketReducer(initialState, action);
    expect(reducer.basketItems.length).toBe(1);
    expect(reducer.basketItems[0].sku).toBe(1);
    expect(reducer.totalAmount).toBe("1.11");
  });

  it("removes product to basket items", () => {
    const action = removeProductFromBasket(products[0]);
    const initialState = {
      basketItems: [
        {
          sku: 1,
          quantity: 2,
        },
      ],
      totalAmount: 2.22,
      checkoutError: undefined,
      checkoutSuccess: "",
    };
    const reducer = BasketReducer(initialState, action);
    expect(reducer.basketItems.length).toBe(0);
    expect(reducer.basketItems[0]).toBeUndefined();
    expect(reducer.totalAmount).toBe(0.0);
  });

  it("reduces the quantity of a product by one", () => {
    const action = reduceProductQuantity(products[0]);
    const initialState = {
      basketItems: [
        {
          sku: 1,
          quantity: 3,
        },
      ],
      totalAmount: 3.33,
      checkoutError: undefined,
      checkoutSuccess: "",
    };
    const reducer = BasketReducer(initialState, action);
    expect(reducer.basketItems.length).toBe(1);
    expect(reducer.basketItems[0].quantity).toBe(2);
    expect(reducer.totalAmount).toBe("2.22");
  });

  it("changes the quantity of a product", () => {
    const newProductInfo = {
      sku: 1,
      unitPrice: 1.11,
      prevQuantity: 3,
      newQuantity: 4,
    };
    const action = changeProductQuantity(newProductInfo);
    const initialState = {
      basketItems: [
        {
          sku: 1,
          quantity: 3,
        },
      ],
      totalAmount: 3.33,
      checkoutError: undefined,
      checkoutSuccess: "",
    };
    const reducer = BasketReducer(initialState, action);
    expect(reducer.basketItems.length).toBe(1);
    expect(reducer.basketItems[0].quantity).toBe(4);
    expect(reducer.totalAmount).toBe("4.44");
  });

  it("checks user out successfully", () => {
    const action = checkoutSuccess("Transaction was successful.");
    const initialState = {
      basketItems: [
        {
          sku: 1,
          quantity: 3,
        },
      ],
      totalAmount: 3.33,
      checkoutError: undefined,
      checkoutSuccess: "",
    };
    const reducer = BasketReducer(initialState, action);
    expect(reducer.basketItems.length).toBe(0);
    expect(reducer.totalAmount).toBe(0.0);
    expect(reducer.checkoutSuccess).toBe("Transaction was successful.");
  });

  it("fails to check user out", () => {
    const action = checkoutFailed("Transaction was unsuccessful.");
    const initialState = {
      basketItems: [
        {
          sku: 1,
          quantity: 3,
        },
      ],
      totalAmount: 3.33,
      checkoutError: undefined,
      checkoutSuccess: "",
    };
    const reducer = BasketReducer(initialState, action);
    expect(reducer.basketItems.length).toBe(1);
    expect(reducer.totalAmount).toBe(3.33);
    expect(reducer.checkoutError).toBe("Transaction was unsuccessful.");
  });
});
