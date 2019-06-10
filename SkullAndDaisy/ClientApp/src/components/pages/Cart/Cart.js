import React, { Component } from 'react';
import orderRequests from '../../../helpers/data/orderRequests';
import userRequests from '../../../helpers/data/userRequests';
import './Cart.scss';

class Cart extends Component {
  state = {
    pendingOrder: [],
    userId: 0,
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        orderRequests.getPendingOrder(this.state.userId)
          .then((pendingOrder) => {
            console.log(pendingOrder);
          });
      })
      .catch((error) => {
        console.error('error on getPendingOrder', error);
      });
  }

  render() {
    return (
      <div className = 'Cart'>
        <h1>Your Cart</h1>
      </div>
    );
  }
}

export default Cart;
