import React from "react";
import ProductsList from "../ProductsList";
import { render, screen, waitFor } from "@testing-library/react";
import { products } from "../../shared/stubs/Products";
import Root from "../../Root";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://localhost:9001/products", (req, res, ctx) => {
    return res(ctx.json(products));
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<ProductsList />", () => {
  it("renders a list of 5 products", async () => {
    render(
      <Root>
        <ProductsList />
      </Root>
    );
    const productItems = await screen.findAllByRole("row");
    await waitFor(() => expect(productItems.length).toBe(5));
  });

  it("renders correct product information in table", async () => {
    render(
      <Root>
        <ProductsList />
      </Root>
    );
    const productItems = await screen.findAllByRole("row");

    await waitFor(() =>
      expect(productItems[3]).toHaveTextContent("Product Four")
    );
    await waitFor(() =>
      expect(productItems[3]).toHaveTextContent("Product Four description")
    );
    await waitFor(() => expect(productItems[3]).toHaveTextContent(4.54));
  });
});
