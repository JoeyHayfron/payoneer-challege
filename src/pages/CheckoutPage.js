import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import CheckoutList from "../components/CheckoutList";
import { Link } from "react-router-dom";
import { proceedToCheckOutAsync } from "../redux/actions/";
import { connect } from "react-redux";
import { selectBasketItemCount } from "../redux/selectors/basket";
import cardChecker from "../BasketNodeServer/client_utils/esmodules/luhn_check";

const CheckoutPage = (props) => {
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardValid, setCardValid] = React.useState();

  const handleSetCardNumber = (e) => {
    setCardNumber(e.target.value);
    e.target.value === ""
      ? setCardValid()
      : setCardValid(cardChecker(e.target.value));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const item = {
      basket: props.basketItems,
      cardNumber,
    };
    props.proceedToCheckOut(item);
  };

  useEffect(() => {
    if (props.checkoutSuccess) {
      alert(props.checkoutSuccess);
      window.location.href = "/";
    }
  }, [props.checkoutSuccess]);

  return (
    <Wrapper>
      <Header />
      <CheckoutList />
      <br />
      <br />
      <div>
        <Form data-testid="checkout-form">
          <label data-testid="checkout-label">Input your card number</label>
          <Input
            type="number"
            style={{ padding: "10px", width: "300px", appearance: "textfield" }}
            value={cardNumber}
            onChange={handleSetCardNumber}
            onFocus={() => setCardValid(false)}
            data-testid="checkout-input"
          />
          <button
            data-testid="continue-shopping"
            style={{
              width: "150px",
              padding: "10px",
              backgroundColor: "#d6d1d5",
              border: "none",
              borderRadius: "4px",
            }}
          >
            <Link to="/">Continue Shopping</Link>
          </button>
          {props.basketItemsCount > 0 && cardValid === true ? (
            <button
              type="button"
              data-testid="checkout"
              style={{
                width: "150px",
                padding: "10px",
                backgroundColor: "#00a8ef",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          ) : (
            ""
          )}
        </Form>
        {cardValid === false ? (
          <div data-testid="invalid-card" style={{ color: "#ef4444" }}>
            Invalid card details
          </div>
        ) : (
          ""
        )}
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    checkoutError: state.basket.checkoutError,
    checkoutSuccess: state.basket.checkoutSuccess,
    basketItems: state.basket.basketItems,
    basketItemsCount: selectBasketItemCount(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    proceedToCheckOut: (basketData) =>
      dispatch(proceedToCheckOutAsync(basketData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);

const Wrapper = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  border-radius: 4px;
`;
