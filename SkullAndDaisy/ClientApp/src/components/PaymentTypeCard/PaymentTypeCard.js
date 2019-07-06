import React, { Component } from 'react';
import paymentTypeShape from '../../helpers/props/paymentTypeShape';
import './PaymentTypeCard.scss';

export default class PaymentTypeCard extends Component {
	static propTypes = {
		paymentType: paymentTypeShape,
	}

	// Function that allows user to edit appointment
	editPaymentType = (e) => {
		e.preventDefault();
		const { passPaymentTypeToEdit, paymentType } = this.props;

		// Function that sets the state of the EditId to the paymentTypeId.
		passPaymentTypeToEdit(paymentType.id);

		// Opens the modal
		this.setState({ open: true });
	}

	// Function that renders the edit button on each appointment item
    makeEditButton = () => {
		  return (
			<div id="editButtonDiv">
			  <span className="">
				<button className="primary" onClick={this.editPaymentType}>
				  Edit
				</button>
			  </span>
			</div>
		  );
		};
  
	  // Function that renders the delete button on each appointment item
	makeDeleteButton = () => {
		  return (
			<div id="deleteButtonDiv">
			  <span className="">
				<button className="btn btn-default" onClick={this.deleteAppointment}>
				  Delete
				</button>
			  </span>
			</div>
		  )
		};

	render() {
		const { paymentType } = this.props;
		return (
			<div id="paymentTypeCardContainer">
				<div className="paymentTypeCard">
					<p>{paymentType.name} ending in ....</p>
					{this.makeEditButton()}
				</div>
			</div>
		)
	}
}

