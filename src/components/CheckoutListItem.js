import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  removeProductFromBasket,
  changeProductQuantity,
} from "../redux/actions/";

const CheckoutListItem = ({
  basketItem,
  removeItemFromBasket,
  changeItemQuantity,
}) => {
  const selectorOptions = () => {
    let optionsArray = [];
    for (let i = 1; i <= basketItem.basketLimit; i++) {
      optionsArray.push(i);
    }
    return optionsArray;
  };
  return (
    <Wrapper data-testid="checkout-list-item">
      <TableData>{basketItem.name}</TableData>
      <TableData>
        <select
          name="quantity"
          id="quantity"
          value={basketItem.quantity}
          onChange={(e) => {
            const newItem = {
              sku: basketItem.sku,
              newQuantity: e.target.value,
              prevQuantity: basketItem.quantity,
              unitPrice: basketItem.unitPrice,
            };
            changeItemQuantity(newItem);
          }}
        >
          {selectorOptions().map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </TableData>
      <TableData>
        <span>£</span>
        {basketItem.unitPrice}
      </TableData>
      <TableData>
        <span>£</span>
        {basketItem.totalPrice}
      </TableData>
      <TableData>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#ef4444",
            border: "none",
            borderRadius: "4px",
            color: "white",
          }}
          onClick={() => {
            removeItemFromBasket(basketItem);
          }}
        >
          Remove all
        </button>
      </TableData>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItemFromBasket: (item) => dispatch(removeProductFromBasket(item)),
    changeItemQuantity: (item) => dispatch(changeProductQuantity(item)),
  };
};

export default connect(null, mapDispatchToProps)(CheckoutListItem);

const Wrapper = styled.tr`
  width: 100%;
`;

const TableData = styled.td`
  padding: 15px;
  text-align: left;
`;
