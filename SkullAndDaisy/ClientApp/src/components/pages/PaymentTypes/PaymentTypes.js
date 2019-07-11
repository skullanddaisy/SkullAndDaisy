import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import PaymentTypeCard from '../../PaymentTypeCard/PaymentTypeCard';
import paymentTypeRequests from '../../../helpers/data/paymentTypeRequests';
import './PaymentTypes.scss';
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Form,
	FormGroup,
	Label
} from 'reactstrap';

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
    paymentType: {},
    editId: '-1',
    isEditing: false,
    newPaymentType: defaultPaymentType,
    modalOpen: false,
  }

  componentDidMount() {
    userRequests.getSingleUser()
      .then((user) => {
        const userId = user.id;
        this.setState({currentUser: user});
        paymentTypeRequests.getAllActivePaymentTypes(userId)
          .then((activePaymentTypes) => {
            this.setState({paymentTypes: activePaymentTypes});
          })
      })
  }

  formSubmitUpdatePayment = () => {
    const { currentUser, newPaymentType } = this.state;
    const userId = currentUser.id;
    const paymentTypeId = newPaymentType.id;
    const myPaymentType = { ...this.state.newPaymentType };

    paymentTypeRequests.updatePaymentType(paymentTypeId, myPaymentType)
      .then(() => {
        paymentTypeRequests.getAllActivePaymentTypes(userId)
          .then((paymentTypes) => {
            this.setState({ paymentTypes, isEditing: false, editId: '-1' });
          });
      })
    .catch(err => console.error('error with payment post', err));
  };
  
  formSubmitAddPayment = () => {
    const userId = this.state.currentUser.id;
    const myPaymentType = { ...this.state.newPaymentType };
    const { paymentTypes } = this.state;
    myPaymentType.userId = userId;

    paymentTypeRequests.addPaymentType(myPaymentType)
      .then(() => {
        this.setState({ newPaymentType: defaultPaymentType });
        paymentTypeRequests.getAllActivePaymentTypes(userId)
          .then((paymentTypes) => {
            this.setState({ paymentTypes });
          })
      })
  }

  deletePaymentType = (paymentTypeId) => {
    const { currentUser } = this.state;
    const userId = currentUser.id
    paymentTypeRequests.getSinglePaymentType(paymentTypeId)
    .then((paymentType) => {
      console.log(paymentType);
      paymentType.isActive = false;
      paymentTypeRequests.updatePaymentType(paymentTypeId, paymentType)
        .then((payment) => {
          console.log(payment);
          paymentTypeRequests.getAllActivePaymentTypes(userId)
          .then((paymentTypes) => {
            this.setState({ paymentTypes });
          });
        })
      })
    .catch(err => console.error('error with delete payment type', err));
  }

  passPaymentTypeToEdit = (paymentType) => {
    this.setState({ isEditing: true, editId: paymentType.id, newPaymentType: paymentType })
  }

  openModal = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false, isEditing: false, newPaymentType: defaultPaymentType })
  }

  formFieldStringState = (name, e) => {
    const tempPaymentType = { ...this.state.newPaymentType };
    tempPaymentType[name] = e.target.value;
    this.setState({ newPaymentType: tempPaymentType });
  }

  nameChange = e => this.formFieldStringState('name', e);

  accountNumberChange = e => this.formFieldStringState('accountNumber', e);

  // Function that allows user to edit paymentType
  editPaymentType = (e) => {
    e.preventDefault();
    const { passPaymentTypeToEdit, paymentType } = this.props;

    // Function that sets the state of the EditId to the paymentTypeId.
    passPaymentTypeToEdit(paymentType.id);

    // Opens the modal
    this.setState({ modalOpen: true });
  }

  render() {
    const {
      paymentTypes,
      newPaymentType,
      modalOpen,
      isEditing,
      editId
    } = this.state;

    const paymentCardComponents = paymentTypes.map(paymentType =>(
      <PaymentTypeCard 
        key={paymentType.id}
        paymentType={paymentType}
        passPaymentTypeToEdit={this.passPaymentTypeToEdit}
        isEditing={isEditing}
        editId={editId}
        openModal={this.openModal}
        editPaymentType={this.editPaymentType}
        deletePaymentType={this.deletePaymentType}
      />
    ))

    return (
      <div className='payment-types'>
        <h2 id="paymentTypesHeader">Payment Types</h2>
        <div id="paymentCardContainer">
          {paymentCardComponents}
        </div>
        <div id="addPaymentButtonDiv">
          <Button color="primary" onClick={this.openModal}>+ Add Payment Method</Button>
        </div>
        <div>
				<Modal
					isOpen={modalOpen}
					toggle={this.toggle}
					isEditing={isEditing}
					editId={editId}
				>
					<ModalHeader></ModalHeader>
					<ModalBody>
					<Form>
						<FormGroup>
							<Label for="name">Name:</Label>
							<input
							maxLength="55"
							type="text"
							className="form-control"
							id="name"
							aria-describedby="nameHelp"
							value={newPaymentType.name}
							onChange={this.nameChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="accountNumber">Account Number:</Label>
							<input
							type="text"
							className="form-control"
							id="accountNumber"
							aria-describedby="accountNumberHelp"
							value={newPaymentType.accountNumber}
							onChange={this.accountNumberChange}
							/>
						</FormGroup>
						<ModalFooter>
							<Button color="primary" onClick={(e) => {
                if (isEditing) {
                  e.preventDefault();
                  this.formSubmitUpdatePayment();
                  this.closeModal();
                } else {
                  e.preventDefault();
                  this.formSubmitAddPayment();
                  this.closeModal();
                }
							}}>Save Payment Method</Button>
							<Button color="secondary" onClick={this.closeModal}>Cancel</Button>
						</ModalFooter>
					</Form>
					</ModalBody>
				</Modal>
			</div>
      </div>
    );
  }
}

export default PaymentTypes;
