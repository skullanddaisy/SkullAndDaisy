import React from 'react';
import OrderItem from '../../OrderItem/OrderItem';
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
        orderRequests.getAllMyOrders(this.state.userId).then((myOrders) => {
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
        <h2>Order History</h2>
        <div>
          {OrderItemComponents}
        </div>
      </div>
    );
  }
}

export default Orders;
