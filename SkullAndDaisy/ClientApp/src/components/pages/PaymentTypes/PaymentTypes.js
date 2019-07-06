import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import PaymentTypeCard from '../../PaymentTypeCard/PaymentTypeCard';
// import PaymentType from '../../PaymentType/PaymentType';
// import PaymentTypeModal from '../../PaymentTypeModal/PaymentTypeModal';
import PaymentTypeRequests from '../../../helpers/data/paymentTypeRequests';
import './PaymentTypes.scss';


const defaultPaymentType = {
  name: '',
  accountNumber: '',
  userId: 0,
  isActive: true,
}

class PaymentTypes extends React.Component {

  state = {
    currentUser: {},
    paymentTypes: [],
    singlePaymentType: {},
    open: false,
    editId: '-1',
    isEditing: false,
    newPaymentType: defaultPaymentType,
  }

  componentDidMount() {
    userRequests.getSingleUser()
      .then((user) => {
        this.setState({currentUser: user});
        this.setState({paymentTypes: user.paymentTypes})
      })
  }

  addPaymentType = (newPaymentType) => {
    const userId = this.state.currentUser.id;
    newPaymentType.userId = userId;
    PaymentTypeRequests.addPaymentType(newPaymentType)
      .then(() => {
        PaymentTypeRequests.getAllPaymentTypes(userId)
          .then((paymentTypes) => {
            this.setState({ paymentTypes });
            this.props.history.push(`/paymenttypes`);
          })
        .catch(err => alert(`error with getting payment types`, err));
      })
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

  formSubmit = (e) => {
    e.preventDefault();
    const myPaymentType = { ...this.state.newPaymentType };
    this.addPaymentType(myPaymentType);
    this.setState({ newPaymentType: defaultPaymentType})
  }

  nameChange = e => this.formFieldStringState('name', e);

  accountNumberChange = e => this.formFieldStringState('accountNumber', e);

  render() {
    const {
      currentUser,
      paymentTypes,
      newPaymentType,
      
    } = this.state;

    const firstName = currentUser.firstName;
    const lastName = currentUser.lastName;

    const paymentCardComponents = paymentTypes.map(paymentType =>(
      <PaymentTypeCard 
        key={paymentType.id}
        paymentType={paymentType}
      />
    ))

    return (
      <div className='payment-types'>
        <h2>Payment Types</h2>
        <div id="paymentCardContainer">
          <div id="paymentCard">
            <p>{firstName}</p>
            <p>{lastName}</p>
          </div>
          <div className="paymentTypeForm">
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
              <button color="primary" onClick={this.formSubmit}>Save Payment Type</button>
            </form>
          </div>
          <div>
            {paymentCardComponents}
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentTypes;