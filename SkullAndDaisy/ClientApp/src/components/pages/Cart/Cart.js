import React, { Component } from 'react';
import { Row } from 'reactstrap';
import orderRequests from '../../../helpers/data/orderRequests';
import userRequests from '../../../helpers/data/userRequests';
import CartProductItem from '../../CartProductItem/CartProductItem';
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
  state = {
    userId: 0,
    pendingOrder: defaultPendingOrder,
    numberOfProducts: 0,
    totalPriceOfOrder: 0,
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
    const { pendingOrder, numberOfProducts, totalPriceOfOrder } = this.state;

    const CartProductItemComponents = pendingOrder.products.map(product => (
      <CartProductItem
        product={product}
      />
    ));

    return (
      <div className = 'Cart'>
        <h1>Your Cart</h1>
        <div>
          <h3>Shopping Cart</h3>
          <Row>
          <p>Price</p>
          <p>Quantitiy</p>
          </Row>
          <Row>
            {CartProductItemComponents}
          </Row>
          <Row>
            <p>SubTotal ({numberOfProducts} items): {totalPriceOfOrder}</p>
          </Row>
        </div>
      </div>
    );
  }
}

export default Cart;
