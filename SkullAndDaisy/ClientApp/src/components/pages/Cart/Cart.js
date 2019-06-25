import React, { Component } from 'react';
import {
  Card,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
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
    modal: false,
    dropdownOpen: false,
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
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

  openProcessOrder = () => {
    this.setState({ modal: true });
  }

  closeModal = () => {
    this.setState({ modal: false });
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
      modal,
    } = this.state;

    const makeModal = () => {
      if (modal) {
        return (
          <div>
            <Modal isOpen={this.state.modal} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Checkout</ModalHeader>
              <ModalBody>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle
                  tag="span"
                  onClick={this.toggle}
                  data-toggle="dropdown"
                  aria-expanded={this.state.dropdownOpen}
                >
                  Choose Payment Method
                </DropdownToggle>
                <DropdownMenu>
                  <div onClick={this.toggle}>Payment 1</div>
                  <div onClick={this.toggle}>Payment 2</div>
                  <div onClick={this.toggle}>Payment 3</div>
                  <div onClick={this.toggle}>Payment 4</div>
                </DropdownMenu>
              </Dropdown>
              <p className='subTotalText mt-3'>SubTotal ({numberOfProducts} items): <strong className='totalPrice'>${totalPriceOfOrder}</strong></p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Process Order</Button>{' '}
                <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
      return <div></div>;
    };

    return (
      <div className = 'Cart'>
        {makeModal()}
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
              <Button className='proceedButton btn-warning m-2' onClick={this.openProcessOrder}>Proceed To Checkout</Button>
            </div>
        </Card>
      </div>
    );
  }
}

export default Cart;
