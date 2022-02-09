import React from "react";
import Header from "../Header";
import { render, screen } from "@testing-library/react";
import Root from "../../Root";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";

describe("<Header />", () => {
  it("renders a header for the products page with 0 item count and 0 total amount", () => {
    let mockStore = configureMockStore()({
      products: {
        productsList: [],
        errMsg: "",
      },
      basket: {
        basketItems: [],
        totalAmount: 0,
      },
    });
    render(
      <Root store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Root>
    );
    const totalItemsCount = screen.queryByTestId("basket-items-count");
    const totalItemsAmount = screen.queryByTestId("basket-total-amount");
    expect(totalItemsCount).toHaveTextContent("0");
    expect(totalItemsAmount).toHaveTextContent("0");
  });

  it("renders a header for checkout page with 0 item count and no total amount ", () => {
    window.history.pushState({}, "", "/checkout");

    let mockStore = configureMockStore()({
      products: {
        productsList: [],
        errMsg: "",
      },
      basket: {
        basketItems: [],
        totalAmount: 0,
      },
    });
    render(
      <Root store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Root>
    );
    const totalItemsCount = screen.queryByTestId("basket-items-count");
    const totalItemsAmount = screen.queryByTestId("basket-total-amount");
    expect(totalItemsCount).toHaveTextContent("0");
    expect(totalItemsAmount).toBeNull();
  });
});
