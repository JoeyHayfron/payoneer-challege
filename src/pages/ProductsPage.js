import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectBasketItemCount } from "../redux/selectors/basket";

const ProductsPage = (props) => {
  useEffect(() => {
    if (props.productErrMsg) {
      alert(props.productErrMsg);
      window.location.reload();
    }
  }, [props.productErrMsg]);
  return (
    <Wrapper>
      <Header />
      <ProductsList />
      <br></br>
      {props.basketItemsCount ? (
        <button
          style={{
            padding: "10px",
            backgroundColor: "#0092d3",
            border: "none",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
          }}
          data-testid="proceed-to-checkout"
        >
          <Link to="/checkout">Proceed to checkout</Link>
        </button>
      ) : (
        ""
      )}
    </Wrapper>
  );
};
const mapStateToProps = (state) => {
  return {
    basketItemsCount: selectBasketItemCount(state),
    productErrMsg: state.products.productErrMsg,
  };
};
export default connect(mapStateToProps)(ProductsPage);

const Wrapper = styled.div`
  padding: 20px;
`;
