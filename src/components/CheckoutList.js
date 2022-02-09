import React, { u } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import CheckoutListItem from "./CheckoutListItem";
import { selectCheckoutItems } from "../redux/selectors/basket";

const CheckoutList = (props) => {
  console.log("PROPS", props);
  return (
    <Wrapper data-testid="checkout-list">
      <Table>
        <tbody>
          <tr>
            <TableHead>Product Name</TableHead>
            <TableHead>Selected Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead></TableHead>
          </tr>
          {props.checkoutItems.length > 0 ? (
            props.checkoutItems.map((item) => (
              <CheckoutListItem basketItem={item} key={item.sku} />
            ))
          ) : (
            <tr>There are no items in the basket</tr>
          )}
        </tbody>
      </Table>

      <br />
      <br />

      <div>
        <span>Total Amount:</span>
        {"  "}
        <span>£</span>
        <span>{props.totalAmount}</span>
      </div>
    </Wrapper>
  );
};
const mapStateToProps = (state) => {
  return {
    checkoutItems: selectCheckoutItems(state),
    totalAmount: state.basket.totalAmount,
  };
};
export default connect(mapStateToProps)(CheckoutList);

const Wrapper = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
`;

const TableHead = styled.th`
  text-align: left;
`;
