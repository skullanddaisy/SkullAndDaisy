import React, { Component } from 'react';
import paymentTypeShape from '../../helpers/props/paymentTypeShape';
import { Button } from 'reactstrap';
import './PaymentTypeCard.scss';

export default class PaymentTypeCard extends Component {
	static propTypes = {
		paymentType: paymentTypeShape,
	}

	// Function that allows user to edit paymentType
	editPaymentType = (e) => {
		e.preventDefault();
		const { passPaymentTypeToEdit, paymentType, openModal } = this.props;

		// Function that sets the state of the EditId to the paymentTypeId.
		passPaymentTypeToEdit(paymentType);

		// Opens the modal
		openModal();
	}

	deletePaymentType = (e) => {
		e.preventDefault();
		const { deletePaymentType, paymentType } = this.props;
		deletePaymentType(paymentType.id);
	}

	// Function that renders the edit button on each paymentType item
    makeEditButton = () => {
		  return (
			<div id="editButtonDiv">
			  <span className="">
				<Button className="editButton" onClick={this.editPaymentType}>
				  Edit
				</Button>
			  </span>
			</div>
		  );
		};
  
	// Function that renders the delete button on each paymentType item
	makeDeleteButton = () => {
		  return (
			<div id="deleteButtonDiv">
			  <span className="">
				<Button className="btn-danger" onClick={this.deletePaymentType}>
				  Delete
				</Button>
			  </span>
			</div>
		  )
		};
		
		render() {
		const { paymentType } = this.props;
		const accountNum = paymentType.accountNumber.split('');
		const lastFour = accountNum.slice(-4); 
		return (
			<div id="paymentTypeCardContainer">
				<div className="paymentTypeCard">
					<div className="paymentText col-6">
						<p>{paymentType.name} ending in ({lastFour})</p>
					</div>
					<div className="paymentEditDiv col-2">
						{this.makeEditButton()}
					</div>
					<div className="paymentDeleteDiv col-2">
						{this.makeDeleteButton()}
					</div>
				</div>
			</div>
		)
	}
}

