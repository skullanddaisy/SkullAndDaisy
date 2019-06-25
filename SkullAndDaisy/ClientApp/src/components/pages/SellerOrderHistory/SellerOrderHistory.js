import React, { Component } from 'react';
import userRequests from '../../../helpers/data/userRequests';
import orderRequests from '../../../helpers/data/orderRequests';
import SoldItem from '../../SoldItem/SoldItem';
import './SellerOrderHistory.scss';

export default class SellerOrderHistory extends Component {
  state = {
    userId: 0,
    mySales: [],
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
            this.setState({ mySales: sales });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { mySales } = this.state;

    const SalesItemComponents = mySales.map(order => (
      <SoldItem
        order={order}
        key={order.id}
      />
    ));

    return (
      <div className='orders'>
        <div>
          <h2 className='header m-4'>Seller Order History</h2>
        </div>
        <div>
          {SalesItemComponents}
        </div>
      </div>
    );
  }
}
