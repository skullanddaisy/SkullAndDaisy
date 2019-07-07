import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import PaymentTypeCard from '../../PaymentTypeCard/PaymentTypeCard';
// import PaymentType from '../../PaymentType/PaymentType';
// import PaymentTypeModal from '../../PaymentTypeModal/PaymentTypeModal';
import paymentTypeRequests from '../../../helpers/data/paymentTypeRequests';
import './PaymentTypes.scss';
// import EditPaymentType from '../../Modals/EditPaymentType';
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
        this.setState({currentUser: user});
        this.setState({paymentTypes: user.paymentTypes})
      })
  }

  addPaymentType = (newPaymentType) => {
    const userId = this.state.currentUser.id;
    paymentTypeRequests.addPaymentType(newPaymentType)
      .then(() => {
        paymentTypeRequests.getAllPaymentTypes(userId)
          .then((paymentTypes) => {
            this.setState({ paymentTypes });
            this.props.history.push(`/paymenttypes`);
          })
        .catch(err => alert(`error with getting payment types`, err));
      })
  }

  formSubmitUpdatePayment = () => {
    const { isEditing, currentUser, paymentType } = this.state;
    const userId = currentUser.id;
    const paymentTypeId = paymentType.id;
    if (isEditing) {
      paymentTypeRequests.updatePaymentType(paymentTypeId)
        .then(() => {
          paymentTypeRequests.getAllPaymentTypes(userId)
            .then((paymentTypes) => {
              this.setState({ paymentTypes, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with payment post', err));
    }
  };
  
  deletePaymentType = (paymentTypeId) => {
    const { currentUser } = this.state;
    const userId = currentUser.id
    paymentTypeRequests.deletePaymentType(paymentTypeId)
      .then(() => {
        paymentTypeRequests.getAllPaymentTypes(userId)
          .then((paymentTypes) => {
            this.setState({ paymentTypes });
          });
      })
      .catch(err => console.error('error with delete payment type', err));
  }

  passPaymentTypeToEdit = (paymentTypeId) => {
    this.setState({ isEditing: true, editId: paymentTypeId })
  } 

  openModal = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
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

  formSubmitAddPayment = (e) => {
    e.preventDefault();
    const myPaymentType = { ...this.state.newPaymentType };
    this.addPaymentType(myPaymentType);
    this.setState({ newPaymentType: defaultPaymentType})
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
      paymentType,
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
        <h2>Payment Types</h2>
        <div>
          <Button className="primary" onClick={this.openModal}>+ Add Payment Method</Button>
        </div>
        <div id="paymentCardContainer">
          {paymentCardComponents}
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
							value={paymentType.name}
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
							value={paymentType.accountNumber}
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
                  this.addPaymentType();
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
