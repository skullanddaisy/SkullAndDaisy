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
  Alert,
} from 'reactstrap';
import orderRequests from '../../../helpers/data/orderRequests';
import userRequests from '../../../helpers/data/userRequests';
import paymentTypeRequests from '../../../helpers/data/paymentTypeRequests';
import CartTable from './CartTable/CartTable';
import './Cart.scss';
import productOrderRequests from '../../../helpers/data/productOrderRequests';
import productRequests from '../../../helpers/data/productRequests';

const defaultPendingOrder = {
  id: 0,
  orderDate: '',
  orderStatus: '',
  paymentTypeId: 0,
  total: 0.00,
  userId: 0,
  products: [],
};

const defaultPaymentType = {
  name: '',
  accountNumber: '',
  userId: 0,
  isActive: true,
}

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
    showAlert: false,
    newPaymentType: defaultPaymentType,
    addPayment: false,
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onDismiss = () => {
    this.setState({ showAlert: false });
  }

  changeValue = (e) => {
    const dropDownValue = e.target.value;
    let paymentMethodKey = e.target.id;
    paymentMethodKey *= 1;
    this.setState({ dropDownValue, paymentMethodKey, showAlert: false });
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

  enterNewPayment = () => {
    this.setState({ addPayment: true});
  }

  exitNewPayment = () => {
    this.setState({ addPayment: false })
  }

  processOrder = () => {
    const { paymentMethodKey, pendingOrder, totalPriceOfOrder } = this.state;
    if (paymentMethodKey === 0) {
      this.setState({ showAlert: true });
    } else {
      const myOrder = { ...pendingOrder };
      myOrder.paymentTypeId = paymentMethodKey;
      myOrder.orderStatus = 'Complete';
      myOrder.total = totalPriceOfOrder;
      myOrder.orderDate = new Date();
      orderRequests.updateOrder(myOrder)
        .then(() => {
          this.createNewPendingOrder();
          this.updateStockQuantities();
          this.setState({ modal: false });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  updateStockQuantities = () => {
    const { pendingOrder } = this.state;
    pendingOrder.products.forEach((product) => {
      const productQuantity = product.quantity;
      let stockQuantity = 0;
      productRequests.getProductById(product.id)
        .then((originalProduct) => {
          stockQuantity = originalProduct.quantity;
          const newQuantity = stockQuantity - productQuantity;
          originalProduct.quantity = newQuantity;
          productRequests.putRequest(originalProduct.id, originalProduct)
            .then();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  createNewPendingOrder = () => {
    const { pendingOrder, userId, paymentMethodKey } = this.state;
    const newPendingOrder = { ...pendingOrder };
    newPendingOrder.orderStatus = 'Pending';
    newPendingOrder.total = 0.00;
    newPendingOrder.orderDate = new Date();
    newPendingOrder.paymentTypeId = paymentMethodKey;
    newPendingOrder.userId = userId;
    orderRequests.addOrder(newPendingOrder)
      .then(() => {
        this.setProductStates();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setProductStates = () => {
    orderRequests.getPendingOrder(this.state.userId)
      .then((result) => {
        const pendingOrder = result.data[0];
        let numberOfProducts = 0;
        let price = 0;
        const orderProducts = pendingOrder.products;
        for (let i = 0; i < orderProducts.length; i += 1) {
          numberOfProducts += orderProducts[i].quantity;
          price += orderProducts[i].price * orderProducts[i].quantity;
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

  addPaymentType = (newPaymentType) => {
    const userId = this.state.userId;
    newPaymentType.userId = userId;
    paymentTypeRequests.addPaymentType(newPaymentType)
      .then(() => {
        paymentTypeRequests.getAllPaymentTypes(userId)
          .then((paymentMethods) => {
            this.setState({ paymentMethods });
            // this.props.history.push(`/paymenttypes`);
          })
        .catch(err => alert(`error with adding payment method`, err));
      })
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myPaymentType = { ...this.state.newPaymentType };
    this.addPaymentType(myPaymentType);
    this.setState({ newPaymentType: defaultPaymentType});
    this.setState({ addPayment: false });
  }

  formFieldStringState = (name, e) => {
    const tempPaymentType = { ...this.state.newPaymentType };
    tempPaymentType[name] = e.target.value;
    this.setState({ newPaymentType: tempPaymentType });
  }

  formFieldNumberState = (name, e) => {
    const tempPaymentType = { ...this.state.newPaymentType };
    tempPaymentType[name] = e.target.value * 1;
    this.setState({ newPaymentType: tempPaymentType });
  }

  nameChange = e => this.formFieldStringState('name', e);

  accountNumberChange = e => this.formFieldStringState('accountNumber', e);


  render() {
    const {
      numberOfProducts,
      totalPriceOfOrder,
      pendingOrder,
      cartHomeView,
      modal,
      dropDownValue,
      paymentMethods,
      showAlert,
      addPayment,
      newPaymentType
    } = this.state;

    const paymentMethodItems = paymentMethods.map(paymentMethod => (
        <DropdownItem
        id={paymentMethod.id}
        value={paymentMethod.name}
        onClick={this.changeValue}>
        {paymentMethod.name}
        </DropdownItem>
    ));

    const makeAlert = () => {
      if (showAlert) {
        return <Alert className='alert' color="danger" toggle={this.onDismiss}>
        A payment method is needed to process the order.
        </Alert>;
      }
      return <div></div>;
    };

    const makeModal = () => {
      if (modal && this.state.paymentMethods.length === 0) {
        return (
          <div>
            <Modal isOpen={this.state.modal} className={this.props.className}>
              <ModalHeader>No Payment Methods Found</ModalHeader>
              <ModalBody>
                A payment method is needed to process the order.
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
      if (modal === true && addPayment === true) {
        return (
          <div>
            <Modal isOpen={this.state.modal} className={this.props.className}>
              <ModalHeader>Add New Payment Method</ModalHeader>
              <ModalBody>
                {makeAlert()}
                <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  maxLength="55"
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="nameHelp"
                  value={newPaymentType.name}
                  onChange={this.nameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="accountNumber"
                  aria-describedby="accountNumberHelp"
                  value={newPaymentType.accountNumber}
                  onChange={this.accountNumberChange}
                />
              </div>
              <div className="enterPaymentButtons">
                <Button color="success" onClick={this.formSubmit}>Save Payment</Button>
                <Button color="secondary" onClick={this.exitNewPayment}>Cancel</Button>
              </div>
            </form>
              </ModalBody>
            </Modal>
          </div>
        );
      }
      if (modal === true) {
        return (
          <div>
            <Modal isOpen={this.state.modal} className={this.props.className}>
              <ModalHeader>Checkout</ModalHeader>
              <ModalBody>
                {makeAlert()}
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
              <p className='sub m-2'>SubTotal ({numberOfProducts} items): <strong className='totalPrice'>${totalPriceOfOrder}</strong></p>
              </ModalBody>
              <ModalFooter>
                <div className="addPaymentButton">
                  <Button color="success" onClick={this.enterNewPayment}>+ Add Payment</Button>
                </div>
                <Button color="primary" onClick={this.processOrder}>Process Order</Button>{' '}
                <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
      return <div></div>;
    };

    const makeCartTable = () => {
      if (pendingOrder.products.length === 0) {
        return <div>
                <h4>You have no items in your cart.</h4>
                <div className='subTotalCard'>
                  <img className='sad-skull' src='https://cdn2.iconfinder.com/data/icons/skull-emoji-faces/32/skull_face_tear-512.png' alt='sad-face' />
                </div>
              </div>;
      }
      return <div>
              <CartTable
                products={pendingOrder.products}
                cartHomeView={cartHomeView}
                deleteProduct={this.deleteProduct}
                updateProduct={this.updateProduct}
                pendingOrder={pendingOrder}
              />
              <div className='subTotalCard'>
                <p className='subTotalText mt-3'>SubTotal ({numberOfProducts} items): <strong className='totalPrice'>${totalPriceOfOrder}</strong></p>
                <Button className='proceedButton btn-warning m-2' onClick={this.openProcessOrder}>Proceed To Checkout</Button>
              </div>
            </div>;
    };

    return (
      <div className = 'Cart'>
        {makeModal()}
          <Card className='cartCard m-4'>
            <h3 className='d-flex align-self-start m-3'>Shopping Cart</h3>
            {makeCartTable()}
        </Card>
      </div>
    );
  }
}

export default Cart;
