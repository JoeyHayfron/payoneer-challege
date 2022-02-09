import React from "react";
import CheckoutList from "../CheckoutList";
import { render, screen, waitFor } from "@testing-library/react";
import { basket } from "../../shared/stubs/Basket";
import { products } from "../../shared/stubs/Products";
import Root from "../../Root";
import configureMockStore from "redux-mock-store";

describe("<CheckoutList />", () => {
  it("renders only table headers and No Items row", () => {
    render(
      <Root>
        <CheckoutList />
      </Root>
    );
    const checkoutListItems = screen.queryAllByRole("row");
    expect(checkoutListItems.length).toEqual(2);
  });

  it("renders a list of 3 checkout items", async () => {
    let mockStore = configureMockStore()({
      products: {
        productsList: products,
        errMsg: "",
      },
      basket: {
        basketItems: basket,
        totalAmount: 8.88,
      },
    });
    render(
      <Root store={mockStore}>
        <CheckoutList />
      </Root>
    );
    const checkoutListItems = await screen.findAllByRole("row");
    await waitFor(() => expect(checkoutListItems.length).toBe(3));
  });
});
