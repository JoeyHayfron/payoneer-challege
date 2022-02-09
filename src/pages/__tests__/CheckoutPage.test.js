import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutPage from "../CheckoutPage";
import Root from "../../Root";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { basket } from "../../shared/stubs/Basket";
import { products } from "../../shared/stubs/Products";

describe("<CheckoutPage />", () => {
  it("renders Checkout List component", () => {
    render(
      <Root>
        <BrowserRouter>
          <CheckoutPage />
        </BrowserRouter>
      </Root>
    );

    const checkoutList = screen.queryByTestId("checkout-list");
    expect(checkoutList).toBeInTheDocument();
  });

  it("renders a Header component", () => {
    render(
      <Root>
        <BrowserRouter>
          <CheckoutPage />
        </BrowserRouter>
      </Root>
    );

    const header = screen.queryByTestId("header");
    expect(header).toBeInTheDocument();
  });

  it("renders a form element with right content", () => {
    render(
      <Root>
        <BrowserRouter>
          <CheckoutPage />
        </BrowserRouter>
      </Root>
    );

    const form = screen.queryByTestId("checkout-form");
    const label = screen.queryByTestId("checkout-label");
    const continueShoppingButton = screen.queryByTestId("continue-shopping");
    const input = screen.queryByTestId("checkout-input");

    expect(form).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(continueShoppingButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("renders a checkout button if conditions are met", () => {
    const middlewares = [thunk];
    let mockStore = configureMockStore(middlewares)({
      products: {
        productsList: products,
        errMsg: "",
      },
      basket: {
        basketItems: basket,
        totalAmount: 0,
      },
    });
    render(
      <Root store={mockStore}>
        <BrowserRouter>
          <CheckoutPage />
        </BrowserRouter>
      </Root>
    );

    const input = screen.queryByTestId("checkout-input");
    fireEvent.change(input, { target: { value: "4539456463019519" } });

    const checkoutButton = screen.queryByTestId("checkout");

    expect(checkoutButton).toBeInTheDocument();
  });

  it("renders invalid input warning when invalid card details ae entered", () => {
    const middlewares = [thunk];
    let mockStore = configureMockStore(middlewares)({
      products: {
        productsList: products,
        errMsg: "",
      },
      basket: {
        basketItems: basket,
        totalAmount: 0,
      },
    });
    render(
      <Root store={mockStore}>
        <BrowserRouter>
          <CheckoutPage />
        </BrowserRouter>
      </Root>
    );

    const input = screen.queryByTestId("checkout-input");
    fireEvent.change(input, { target: { value: "45394564630195" } });

    const invalidCardDetails = screen.queryByTestId("invalid-card");

    expect(invalidCardDetails).toBeInTheDocument();
  });
});
