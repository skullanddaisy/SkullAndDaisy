import React, { Component } from 'react';
import {
  Row,
  Card,
  Col,
  Button,
} from 'reactstrap';
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
            let numberOfProducts = 0;
            let totalPriceOfOrder = 0;
            const pendingOrder = result.data[0];
            const orderProducts = pendingOrder.products;
            for (let i = 0; i < orderProducts.length; i += 1) {
              numberOfProducts += 1;
              totalPriceOfOrder += orderProducts[i].price;
            }
            this.setState({ pendingOrder, numberOfProducts, totalPriceOfOrder });
          });
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { pendingOrder, numberOfProducts, totalPriceOfOrder } = this.state;

    const CartProductItemComponents = pendingOrder.products.map(product => (
      <CartProductItem
        key={product.id}
        product={product}
      />
    ));

    return (
      <div className = 'Cart'>
          <div className='cartHeader m-4'>
            <h1>Your Cart</h1>
          </div>
          <Card className='cartCard m-4'>
            <h3 className='d-flex align-self-start ml-2'>Shopping Cart</h3>
            <Row>
              <Col className='col-4'></Col>
              <Col className='col-2'>
                <p>Price</p>
              </Col>
              <Col className='col-2'>
                <p>Quantitiy</p>
              </Col>
              <Col className='col-4'></Col>
            </Row>
                {CartProductItemComponents}
              <Col>
                <div className='subTotalCard'>
                  <p className='subTotalText mt-3'>SubTotal ({numberOfProducts} items): <strong className='totalPrice'>${totalPriceOfOrder}</strong></p>
                  <Button className='proceedButton btn-warning m-4'>Proceed To Checkout</Button>
                </div>
              </Col>
            <Row>
              <p>SubTotal ({numberOfProducts} items): ${totalPriceOfOrder}</p>
            </Row>
        </Card>
      </div>
    );
  }
}

export default Cart;
