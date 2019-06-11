import React, { Component } from 'react';
import PropTypes from 'prop-types';
import orderRequests from '../../../helpers/data/orderRequests';
import userRequests from '../../../helpers/data/userRequests';
import './Cart.scss';

const defaultPendingOrder = {
  id: 0,
  orderDate: '',
  orderStatus: '',
  paymentTypeId: 0,
  total: 0.00,
  userId: 0,
  products: [],
};

class Cart extends Component {
  static propTypes = {
    userId: PropTypes.number,
  }

  state = {
    userId: 0,
    pendingOrder: defaultPendingOrder,
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        orderRequests.getPendingOrder(this.state.userId)
          .then((result) => {
            const pendingOrder = result.data[0];
            this.setState({ pendingOrder });
          });
      }).catch((error) => {
        console.error(error);
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
