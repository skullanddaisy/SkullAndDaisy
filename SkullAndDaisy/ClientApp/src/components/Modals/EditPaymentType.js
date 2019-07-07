import React, { Component } from 'react'
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

export default class EditPaymentType extends Component {
	state = {
		modalOpen: false,
		newPaymentType: defaultPaymentType,
	}
	
	  toggle() {
		const tempPaymentType = {};
		tempPaymentType.name = this.props.newPaymentType.name;
		tempPaymentType.accountNumber = this.props.newPaymentType.accountNumber;
		this.setState(prevState => ({
		  modalOpen: !prevState.modalOpen,
		  newPaymentType: tempPaymentType,
		}));
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
		// this.addPaymentType(myPaymentType);
		this.setState({ newPaymentType: defaultPaymentType})
	  }

		// // Function that submits/saves the newly edited appointment and closes the modal
		// formSubmit = (e) => {
		// 	e.preventDefault();
		// 	const { onSubmit } = this.props;
		// 	const myAppointment = { ...this.state.newAppointment };
		// 	myAppointment.uid = authRequests.getCurrentUid();
		// 	onSubmit(myAppointment);
		// 	this.setState({ newAppointment: defaultAppointment, open: false });
		// }
	
	  nameChange = e => this.formFieldStringState('name', e);
	
	  accountNumberChange = e => this.formFieldStringState('accountNumber', e);

	render() {
		const { newPaymentType, modalOpen } = this.state;
		const { isEditing, editId } = this.props;
		return (
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
								e.preventDefault();
								this.formSubmit();
								this.toggle();
							}}>Save Payment Type</Button>
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</Form>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}
