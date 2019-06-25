import React, { Component } from 'react';
import {
  Card,
  Button,
} from 'reactstrap';
import orderRequests from '../../../helpers/data/orderRequests';
import userRequests from '../../../helpers/data/userRequests';
import CartTable from '../../CartTable/CartTable';
import './Cart.scss';
import productOrderRequests from '../../../helpers/data/productOrderRequests';

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
    cartHomeView: false,
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        this.setProductStates();
      }).catch((error) => {
        console.error(error);
      });
  }

  setProductStates = () => {
    orderRequests.getPendingOrder(this.state.userId)
      .then((result) => {
        let numberOfProducts = 0;
        let price = 0;
        const pendingOrder = result.data[0];
        const orderProducts = pendingOrder.products;
        for (let i = 0; i < orderProducts.length; i += 1) {
          numberOfProducts += orderProducts[i].quantity;
          price += orderProducts[i].price;
        }
        const totalPriceOfOrder = Math.round(price * 100) / 100;
        this.setState({ pendingOrder, numberOfProducts, totalPriceOfOrder });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteProduct = (productOrderId) => {
    productOrderRequests.deleteProductOrder(productOrderId)
      .then(() => {
        this.setProductStates();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateProduct = (productOrderObject) => {
    productOrderRequests.updateProductOrder(productOrderObject)
      .then(() => {
        this.setProductStates();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {
      numberOfProducts,
      totalPriceOfOrder,
      pendingOrder,
      cartHomeView,
    } = this.state;

    return (
      <div className = 'Cart'>
          <Card className='cartCard m-4'>
            <h3 className='d-flex align-self-start m-3'>Shopping Cart</h3>
            <div>
              <CartTable
              products={pendingOrder.products}
              cartHomeView={cartHomeView}
              deleteProduct={this.deleteProduct}
              updateProduct={this.updateProduct}
              pendingOrder={pendingOrder}
              />
            </div>
            <div className='subTotalCard'>
              <p className='subTotalText mt-3'>SubTotal ({numberOfProducts} items): <strong className='totalPrice'>${totalPriceOfOrder}</strong></p>
              <Button className='proceedButton btn-warning m-2'>Proceed To Checkout</Button>
            </div>
        </Card>
      </div>
    );
  }
}

export default Cart;
