import React from "react";
import ProductsListItem from "../ProductsListItem";
import { render, screen } from "@testing-library/react";
import { products } from "../../shared/stubs/Products";
import Root from "../../Root";

describe("<ProductsListItem />", () => {
  it("renders a Product List Item with correct information", () => {
    render(
      <Root>
        <table>
          <tbody>
            <ProductsListItem product={products[0]} />
          </tbody>
        </table>
      </Root>
    );
    const productItem = screen.queryByTestId("product-item");
    expect(productItem).toHaveTextContent("Product One");
    expect(productItem).toHaveTextContent("£1.11");
  });
});
