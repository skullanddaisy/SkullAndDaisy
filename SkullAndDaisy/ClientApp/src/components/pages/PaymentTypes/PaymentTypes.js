import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import { Dropdown } from 'semantic-ui-react';
import './PaymentTypes.scss';

class PaymentTypes extends React.Component {
  state = {
    currentUser: {},
    paymentTypes: [],
    singlePaymentType: {}
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
      paymentTypes
    } = this.state;

    const firstName = currentUser.firstName;
    const lastName = currentUser.lastName;
    console.log(paymentTypes)

    return (
      <div className='payment-types'>
        <h2>Payment Types</h2>
        <div id="paymentCardContainer">
          <div id="paymentCard">
            <p>{firstName}</p>
            <p>{lastName}</p>
            <Dropdown 
              id="paymentDropdown"
              placeholder="Payment Options"
              selection
              options={paymentTypes}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentTypes;