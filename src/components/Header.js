import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectBasketItemCount } from "../redux/selectors/basket";

const Header = (props) => {
  const location = useLocation();
  return (
    <Wrapper data-testid="header">
      <div>
        <Link to="/checkout">
          <span>Basket Items:</span>
          {"  "}
          <span data-testid="basket-items-count">{props.totalBasketItems}</span>
        </Link>
      </div>
      {location.pathname === "/" ? (
        <div>
          <Link to="/checkout">
            <span>Total Price:</span> <span>£</span>
            <span data-testid="basket-total-amount">{props.totalAmount}</span>
          </Link>
        </div>
      ) : (
        ""
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    totalBasketItems: selectBasketItemCount(state),
    totalAmount: state.basket.totalAmount,
  };
};

export default connect(mapStateToProps)(Header);

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
  padding: 30px;
  border-bottom: 1px solid #c3cec8;
`;
