import React from "react";
import { render, screen } from "@testing-library/react";
import ProductsPage from "../ProductsPage";
import Root from "../../Root";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { basket } from "../../shared/stubs/Basket";
import thunk from "redux-thunk";

describe("<ProductsPage />", () => {
  it("renders Products List component", () => {
    render(
      <Root>
        <BrowserRouter>
          <ProductsPage />
        </BrowserRouter>
      </Root>
    );

    const productsList = screen.queryByRole("table");
    expect(productsList).toBeInTheDocument();
  });

  it("renders a Header component", () => {
    render(
      <Root>
        <BrowserRouter>
          <ProductsPage />
        </BrowserRouter>
      </Root>
    );

    const header = screen.queryByTestId("header");
    expect(header).toBeInTheDocument();
  });

  it("renders a proceed to checkout button when basket items count is greater than 0", () => {
    const middlewares = [thunk];
    let mockStore = configureMockStore(middlewares)({
      products: {
        productsList: [],
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
          <ProductsPage />
        </BrowserRouter>
      </Root>
    );

    const button = screen.queryByTestId("proceed-to-checkout");
    expect(button).toBeInTheDocument();
  });
});
