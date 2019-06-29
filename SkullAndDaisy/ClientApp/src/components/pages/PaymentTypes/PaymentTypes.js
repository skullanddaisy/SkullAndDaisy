import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import PaymentType from '../../PaymentType/PaymentType';
import './PaymentTypes.scss';

class PaymentTypes extends React.Component {
  state = {
    currentUser: {},
    paymentTypes: [],
    singlePaymentType: {},
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
        </div>
      </div>
    );
  }
}

export default PaymentTypes;