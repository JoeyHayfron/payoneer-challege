import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductsListItem from "./ProductsListItem";
import { connect } from "react-redux";
import { fetchProductsAsync } from "../redux/actions/";

const ProductsList = (props) => {
  useEffect(() => {
    props.getProducts();
  }, []);

  return (
    <Wrapper>
      {props.products.length > 0 ? (
        <tbody>
          {props.products.map((product) => (
            <ProductsListItem product={product} key={product.sku} />
          ))}
        </tbody>
      ) : (
        <div>An error occurred please reload</div>
      )}
    </Wrapper>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.products.productsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProductsAsync()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

const Wrapper = styled.table`
  width: 100%;
`;
