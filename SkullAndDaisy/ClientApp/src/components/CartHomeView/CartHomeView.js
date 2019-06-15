import React, { Component } from 'react';
import {
  Card,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import orderRequests from '../../helpers/data/orderRequests';
import userRequests from '../../helpers/data/userRequests';
import CartTable from '../CartTable/CartTable';
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
    numberOfProducts: 0,
    totalPriceOfOrder: 0,
    cartHomeView: true,
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
    const {
      numberOfProducts,
      totalPriceOfOrder,
      pendingOrder,
      cartHomeView,
    } = this.state;

    return (
      <div className = 'CartHomeView'>
          <Card className='cartCard m-4'>
            <div className='d-flex justify-content-between m-3'>
            <h3>Shopping Cart</h3>
            <div className='subTotalCard'>
              <p className='subTotalText m-1'>SubTotal ({numberOfProducts} items): <strong className='totalPrice'>${totalPriceOfOrder}</strong></p>
              <Button className='proceedButton btn-warning m-1'>Proceed To Checkout</Button>
            </div>
            </div>
            <div>
              <CartTable products={pendingOrder.products} cartHomeView={cartHomeView}/>
            </div>
        </Card>
      </div>
    );
  }
}

export default CartHomeView;