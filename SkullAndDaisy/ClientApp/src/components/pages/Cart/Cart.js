import React, { Component } from 'react';
import PropTypes from 'prop-types';
import orderRequests from '../../../helpers/data/orderRequests';
import './Cart.scss';

class Cart extends Component {
  static propTypes = {
    uid: PropTypes.string,
  }

  state = {
    pendingOrder: [],
  }

  componentDidMount() {
    orderRequests.getPendingOrder(this.state.uid).then((pendingOrder) => {
      this.setState({ pendingOrder });
    }).catch((error) => {
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
