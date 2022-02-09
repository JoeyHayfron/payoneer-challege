import { createSelector } from "reselect";

export const selectBasketItems = (state) => state.basket.basketItems;

export const selectProductList = (state) => state.products.productsList;

export const selectBasketItemCount = createSelector(
  [selectBasketItems],

  (basketItems) =>
    basketItems.reduce(
      (accumulatedCount, basketItem) =>
        parseInt(accumulatedCount) + parseInt(basketItem.quantity),
      0
    )
);

export const selectCheckoutItems = createSelector(
  [selectBasketItems, selectProductList],

  (basketItems, productsList) => {
    return basketItems.map((basketItem) => {
      const item = productsList.find(
        (product) => product.sku === basketItem.sku
      );

      return {
        sku: item.sku,
        name: item.name,
        quantity: basketItem.quantity,
        basketLimit: item.basketLimit,
        unitPrice: item.price,
        totalPrice: item.price * basketItem.quantity,
      };
    });
  }
);
