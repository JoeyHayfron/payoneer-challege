import React from "react";
import CheckoutListItem from "../CheckoutListItem";
import { render, screen } from "@testing-library/react";
import { checkoutItems } from "../../shared/stubs/Basket";
import Root from "../../Root";

describe("<CheckoutListItem />", () => {
  it("renders a Checkout List Item with correct information", () => {
    render(
      <Root>
        <table>
          <tbody>
            <CheckoutListItem basketItem={checkoutItems[0]} />
          </tbody>
        </table>
      </Root>
    );
    const checkoutListItem = screen.queryByTestId("checkout-list-item");
    expect(checkoutListItem).toHaveTextContent("Product One");
    expect(checkoutListItem).toHaveTextContent("£1.11");
    expect(checkoutListItem).toHaveTextContent("£2.22");
  });
});
