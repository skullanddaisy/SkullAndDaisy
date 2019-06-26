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
  DropdownItem,
} from 'reactstrap';
import orderRequests from '../../../helpers/data/orderRequests';
import userRequests from '../../../helpers/data/userRequests';
import paymentTypeRequests from '../../../helpers/data/paymentTypeRequests';
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
    dropDownValue: 'Choose...',
    paymentMethods: [],
    paymentMethodKey: 0,
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  changeValue = (e) => {
    const dropDownValue = e.target.value;
    let paymentMethodKey = e.target.id;
    paymentMethodKey *= 1;
    this.setState({ dropDownValue, paymentMethodKey });
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        this.setProductStates();
        paymentTypeRequests.getPaymentTypesByUserId(userId)
          .then((result) => {
            const paymentMethods = result.data;
            this.setState({ paymentMethods });
          });
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

  processOrder = () => {
    const { paymentMethodKey, pendingOrder, totalPriceOfOrder } = this.state;
    if (paymentMethodKey === 0) {
      console.log('choose a payment method');
    } else {
      const myOrder = { ...pendingOrder };
      myOrder.paymentTypeId = paymentMethodKey;
      myOrder.orderStatus = 'Complete';
      myOrder.total = totalPriceOfOrder;
      myOrder.orderDate = new Date();
      orderRequests.updateOrder(myOrder)
        .then(() => {
          console.log('order has been placed');
          this.setProductStates();
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
      dropDownValue,
      paymentMethods,
    } = this.state;

    const paymentMethodItems = paymentMethods.map(paymentMethod => (
        <DropdownItem
        id={paymentMethod.id}
        value={paymentMethod.name}
        onClick={this.changeValue}>
        {paymentMethod.name}
        </DropdownItem>
    ));

    const makeModal = () => {
      if (modal) {
        return (
          <div>
            <Modal isOpen={this.state.modal} className={this.props.className}>
              <ModalHeader>Checkout</ModalHeader>
              <ModalBody>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <div className='p-1'>
                  <strong className='p-1'>Payment Method:</strong>
                <DropdownToggle
                  tag="span"
                  onClick={this.toggle}
                  data-toggle="dropdown"
                  aria-expanded={this.state.dropdownOpen}
                  caret
                >
                  {dropDownValue}
                </DropdownToggle>
                </div>
                <DropdownMenu>
                  {paymentMethodItems}
                </DropdownMenu>
              </Dropdown>
              <p className='subTotalText mt-3'>SubTotal ({numberOfProducts} items): <strong className='totalPrice'>${totalPriceOfOrder}</strong></p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.processOrder}>Process Order</Button>{' '}
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
