import React from "react";
import {
  addItemToBasket,
  removeItemFromBasket,
  reduceItemQuantity,
  changeItemQuantity,
} from "../../utils/basketUtils";
import { basket } from "../../../shared/stubs/Basket";
import { products } from "../../../shared/stubs/Products";

describe("testing basket utility functions", () => {
  let basketItems;
  let product;
  let totalAmount;

  beforeEach(() => {
    basketItems = basket;
    product = products[0];
    totalAmount = 10.09;
  });

  afterEach(() => {
    basketItems = null;
    product = null;
    totalAmount = null;
  });

  it("increases an existing basket item by one", () => {
    const basketContent = addItemToBasket(basketItems, product, totalAmount);
    expect(
      basketContent.basket.find((item) => item.sku === product.sku).quantity
    ).toEqual(5);
    expect(basketContent.totalAmount).toEqual("11.20");
  });

  it("does not add beyond the basket limit", () => {
    //Item is added twice
    addItemToBasket(basketItems, product, totalAmount);
    const basketContent = addItemToBasket(basketItems, product, totalAmount);
    expect(
      basketContent.basket.find((item) => item.sku === product.sku).quantity
    ).toEqual(5);
    expect(basketContent.totalAmount).toEqual("11.20");
  });

  it("adds a new item to the basket", () => {
    const newProduct = products[1];
    const basketContent = addItemToBasket(basketItems, newProduct, totalAmount);
    expect(
      basketContent.basket.find((item) => item.sku === newProduct.sku).quantity
    ).toEqual(1);
    expect(basketContent.totalAmount).toEqual("12.31");
  });

  it("removes a product from the basket", () => {
    const basketContent = removeItemFromBasket(
      basketItems,
      product,
      totalAmount
    );
    expect(
      basketContent.basket.find((item) => item.sku === product.sku)
    ).toBeUndefined();
    expect(basketContent.totalAmount).toEqual("5.65");
  });

  it("reduces the quantity of a product in the basket", () => {
    const basketContent = reduceItemQuantity(basketItems, product, totalAmount);
    expect(
      basketContent.basket.find((item) => item.sku === product.sku).quantity
    ).toEqual(3);
    expect(basketContent.totalAmount).toEqual("8.98");
  });

  it("removes item when quantity is one and it needs to be reduced", () => {
    const newBasketItems = [
      {
        sku: 1,
        quantity: 1,
      },
      {
        sku: 4,
        quantity: 1,
      },
    ];

    const basketContent = reduceItemQuantity(newBasketItems, product, 5.65);
    expect(
      basketContent.basket.find((item) => item.sku === product.sku)
    ).toBeUndefined();
    expect(basketContent.totalAmount).toEqual("4.54");
  });

  it("changes a product quantity to a specified number", () => {
    const item = {
      sku: 1,
      unitPrice: 1.11,
      prevQuantity: 4,
      newQuantity: 3,
    };
    const basketContent = changeItemQuantity(basketItems, item, totalAmount);
    expect(
      basketContent.basket.find((item) => item.sku === product.sku).quantity
    ).toEqual(3);
    expect(basketContent.totalAmount).toEqual("8.98");
  });
});
