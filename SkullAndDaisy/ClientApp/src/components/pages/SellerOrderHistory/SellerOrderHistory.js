import React, { Component } from 'react';
import userRequests from '../../../helpers/data/userRequests';
import orderRequests from '../../../helpers/data/orderRequests';

export default class SellerOrderHistory extends Component {
  state = {
    userId: 0,
    sellerOrders: [],
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        orderRequests.getSellerOrders(this.state.userId)
          .then((sellerOrders) => {
            const sales = [];
            sellerOrders.forEach((sellerOrder) => {
              if (sellerOrder.orderStatus !== 'Pending') {
                sales.push(sellerOrder);
              }
            });
            this.setState({ sellerOrders: sales });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Your Sales</h2>
      </div>
    );
  }
}
