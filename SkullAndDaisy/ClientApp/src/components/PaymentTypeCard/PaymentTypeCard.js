import React, { Component } from 'react';
import paymentTypeShape from '../../helpers/props/paymentTypeShape';
import './PaymentTypeCard.scss';

export default class PaymentTypeCard extends Component {
	static propTypes = {
		paymentType: paymentTypeShape
	}
	render() {
		const { paymentType } = this.props;
		return (
			<div id="paymentTypeCardContainer">
				<div className="paymentTypeCard">
					<p>{paymentType.name} ending in ....</p>
				</div>
			</div>
		)
	}
}

