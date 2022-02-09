import React from "react";
import styled from "styled-components";
import { addItemToBasket, reduceProductQuantity } from "../redux/actions";
import { connect } from "react-redux";

const ProductsListItem = (props) => {
  return (
    <Wrapper data-testid="product-item">
      <TableData>{props.product.name}</TableData>
      <TableData>{props.product.description}</TableData>
      <TableData>
        <span>£</span>
        {props.product.price}
      </TableData>
      <TableData style={{ textAlign: "right" }}>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#afccde",
            border: "none",
            borderRadius: "4px",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => props.addItemToBasket(props.product)}
        >
          Add to basket
        </button>
      </TableData>
      <TableData style={{ textAlign: "right" }}>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#ef4444",
            border: "none",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => props.reduceProductQuantity(props.product)}
        >
          Remove from basket
        </button>
      </TableData>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToBasket: (item) => dispatch(addItemToBasket(item)),
    reduceProductQuantity: (item) => dispatch(reduceProductQuantity(item)),
  };
};

export default connect(null, mapDispatchToProps)(ProductsListItem);

const Wrapper = styled.tr`
  width: 100%;
`;

const TableData = styled.td`
  padding: 15px;
`;
