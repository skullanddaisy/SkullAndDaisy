import React, { Component } from 'react';
import PropTypes from 'prop-types';
import orderRequests from '../../helpers/data/orderRequests';
import './CartHomeView.scss';

const defaultPendingOrder = {
  id: 0,
  orderDate: '',
  orderStatus: '',
  paymentTypeId: 0,
  total: 0.00,
  userId: 0,
  products: [],
};

class CartHomeView extends Component {
  static propTypes = {
    userId: PropTypes.number,
  }

  state = {
    pendingOrder: defaultPendingOrder,
  }

  componentDidMount() {
    orderRequests.getPendingOrder(this.props.userId)
      .then((result) => {
        const pendingOrder = result.data[0];
        this.setState({ pendingOrder });
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className = 'Cart'>
        <h1>Your Home Cart</h1>
      </div>
    );
  }
}

export default CartHomeView;
