import React from 'react';
import getAllSellerOrders from '../../../helpers/data/orderRequests';
import './CustomerOrders.scss';

class CustomerOrders extends React.Component {
  state = {
    sellerOrders: [],
  }

  componentDidMount() {
    getAllSellerOrders()
      .then((sellerOrders) => {
        this.setState({ sellerOrders });
      })
      .catch(err => console.error('error in getting products', err));
  }

  render() {
    return (
      <div className='customer-orders'>
        <h1>Customer Orders</h1>
      </div>
    );
  }
}

export default CustomerOrders;
