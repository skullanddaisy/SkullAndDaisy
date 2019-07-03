import React from 'react';
import OrderItem from './OrderItem/OrderItem';
import userRequests from '../../../helpers/data/userRequests';
import './Orders.scss';
import orderRequests from '../../../helpers/data/orderRequests';

class Orders extends React.Component {
  state = {
    userId: 0,
    myOrders: [],
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        orderRequests.getAllMyOrders(this.state.userId)
          .then((orders) => {
            const myOrders = orders.filter(order => order.orderStatus !== 'Pending');
            this.setState({ myOrders });
          });
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { myOrders } = this.state;

    const OrderItemComponents = myOrders.map(order => (
      <OrderItem
        order={order}
        key={order.id}
      />
    ));

    return (
      <div className='orders'>
        <div>
          <h2 className='header m-4'>Order History</h2>
        </div>
        <div>
          {OrderItemComponents}
        </div>
      </div>
    );
  }
}

export default Orders;
