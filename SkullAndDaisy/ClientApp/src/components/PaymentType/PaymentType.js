import React, { Component } from 'react'
import { DropdownItem } from 'reactstrap';
import paymentTypeShape from '../../helpers/props/paymentTypeShape';


export default class PaymentType extends Component {
	static propTypes = {
		paymentType: paymentTypeShape
	}
	render() {
		const { paymentType } = this.props;
		return (
			<div>
				<DropdownItem>
				{paymentType.name}
				</DropdownItem>
				<DropdownItem divider />
			</div>
		)
	}
}

