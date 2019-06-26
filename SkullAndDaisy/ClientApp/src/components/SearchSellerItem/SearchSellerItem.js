/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

import React from 'react';
import './SearchSellerItem.scss';

export default class SearchSellerItem extends React.Component {
  render() {
    const { seller } = this.props;
    // const goToDetailsPage = () => {
    //   const productDetails = `sellerDetails/${seller.id}`;
    //   window.location.assign(sellerDetails);
    // };

    return (
			<tr className="searchTableItem">
        <td> </td>
				<td>{seller.firstName} {seller.lastName}</td>
				<td>{seller.username}</td>
		  </tr>
    );
  }
}
