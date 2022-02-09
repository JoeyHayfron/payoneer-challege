import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { products } from "../../../shared/stubs/Products";
import { spyOn } from "";
import { basket } from "../../../shared/stubs/Basket";
import CheckoutPage from "../../../pages/CheckoutPage";
import Root from "../../../Root";
import { rest } from "msw";
import { CHECKOUT_SUCCESS } from "../../../redux/actions/types";
import { setupServer } from "msw/node";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { checkoutSuccess } from "../../../redux/actions/";
import { registerMiddlewares } from "redux-actions-assertions";

describe("Checkout process", () => {
  const server = setupServer(
    rest.get("http://localhost:9001/checkout", (req, res, ctx) => {
      return res(
        ctx.json({
          msg: "The checkout transaction was completed successfully.",
        })
      );
    })
  );

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it("checks user out successfully", async () => {
    const middlewares = [thunk];
    let mockStore = configureMockStore(middlewares)({
      products: {
        productsList: products,
        errMsg: "",
      },
      basket: {
        basketItems: basket,
        totalAmount: 8.98,
      },
    });
    render(
      <Root store={mockStore}>
        <BrowserRouter>
          <CheckoutPage store={mockStore} />
        </BrowserRouter>
      </Root>
    );

    const input = screen.queryByTestId("checkout-input");
    fireEvent.change(input, { target: { value: "4539456463019519" } });

    const checkoutButton = await screen.findByTestId("checkout");
    fireEvent.click(checkoutButton);

    //To be continued

    // mockStore.dispatch(
    //   checkoutSuccess("The checkout transaction was completed successfully.")
    // );

    // const actions = mockStore.getActions();

    // await waitFor(() => expect(actions.length).toBe(1));
  });
});
