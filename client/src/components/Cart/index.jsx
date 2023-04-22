import { PaymentElement } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';

// import { idbPromise } from '../../utils/helpers';
// import CartItem from '../CartItem';
import Auth from '../../utils/auth';
// import { useStoreContext } from '../../utils/GlobalState';
// import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
// import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [donationFormData, setDonationFormData] = useState({
    user: '',
    description: '',
    amount: 0,
  });
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setDonationFormData({
      ...donationFormData,
      [name]: value,
    });
  };

  function submitCheckout() {
    getCheckout({
      variables: { products: productIds },
    });
  }

  // if (!state.cartOpen) {
  //     return (
  //       <div className="cart-closed" onClick={toggleCart}>
  //         <span
  //           role="img"
  //           aria-label="trash">🛒</span>
  //       </div>
  //     );
  //   }

  return (
    <div>
      {/* <div className="close" onClick={toggleCart}>[close]</div> */}
      <h2>Donations</h2>
      {/* <form>
        <PaymentElement />
        <button>Submit</button>
      </form> */}
      {/* <form onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="username"
          name="user"
          type="text"
          value={donationFormData.user}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="description"
          name="description"
          type="text"
          value={donationFormData.description}
          onChange={handleChange}
        />
        <form onSubmit={submitCheckout}>
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            name="amount"
            type="range"
            value={donationFormData.amount}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>
        <button
          className="btn btn-block btn-primary"
          style={{ cursor: 'pointer' }}
          type="submit"
        >
          Submit
        </button>
      </form> */}
      {/* {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {
              Auth.loggedIn() ?
                <button onClick={submitCheckout}>
                  Checkout
                </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
          <h3>
            <span role="img" aria-label="shocked">
              😱
            </span>
            You haven't added anything to your cart yet!
          </h3>
      )} */}
    </div>
  );
};

export default Cart;
