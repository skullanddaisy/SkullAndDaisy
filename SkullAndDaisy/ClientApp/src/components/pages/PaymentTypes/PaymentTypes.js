import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import PaymentType from '../../PaymentType/PaymentType';
// import Collapsible from 'react-collapsible';
import PaymentTypeCard from '../../PaymentTypeCard/PaymentTypeCard';
import './PaymentTypes.scss';

class PaymentTypes extends React.Component {
  state = {
    currentUser: {},
    paymentTypes: [],
    singlePaymentType: {},
    modalDisplayed: false,
  }
  
  componentDidMount() {
    userRequests.getSingleUser()
      .then((user) => {
        this.setState({currentUser: user});
        this.setState({paymentTypes: user.paymentTypes})
      })
  }

  render() {
    const {
      currentUser,
      paymentTypes,
    } = this.state;

    const firstName = currentUser.firstName;
    const lastName = currentUser.lastName;

    const paymentComponents = paymentTypes.map(paymentType => (
      <PaymentType
        key={paymentType.id}
        paymentType={paymentType}
      />
    ));

    const displayModal = () => {
      return (
        <div>
          <Modal isOpen={this.state.modal} className={this.props.className}>
            <ModalHeader>Checkout</ModalHeader>
            <ModalBody>
            <h4>Name on card</h4>
            <p>{firstName} {lastName}</p>
            </ModalBody>
            {/* <ModalFooter> */}
              {/* <Button color="primary" onClick={this.processOrder}>Process Order</Button>{' '}
              <Button color="secondary" onClick={this.closeModal}>Cancel</Button> */}
            {/* </ModalFooter> */}
          </Modal>
        </div>
      );
    };

    // closeModal = () => {
    //   this.setState({ modal: false });
    // }

    const paymentCardComponents = paymentTypes.map(paymentType =>(
      <PaymentTypeCard 
        key={paymentType.id}
        paymentType={paymentType}
        onClick={displayModal()}
      />
    ))

    return (
      <div className='payment-types'>
        <h2>Payment Types</h2>
        <div id="paymentCardContainer">
          <div id="paymentCard">
            <p>{firstName}</p>
            <p>{lastName}</p>
            <UncontrolledDropdown>
              <DropdownToggle id="paymentDropdown" caret>
                {}
              </DropdownToggle>
              <DropdownMenu right>
                {paymentComponents}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div>
            {paymentCardComponents}
            {/* <Collapsible trigger="Master Card" className="paymentType">
              <p>Collapsible shit..</p>
            </Collapsible> */}
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentTypes;