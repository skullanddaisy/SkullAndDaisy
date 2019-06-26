/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

import React from 'react';
import './SearchSellerItem.scss';

export default class SearchSellerItem extends React.Component {
  render() {
    const { seller } = this.props;
    const goToSellerStore = () => {
      const sellerStore = `sellerstore/${seller.id}`;
      window.location.assign(sellerStore);
    };

    return (
			<tr className="searchTableItem" onClick={goToSellerStore}>
        <td> </td>
				<td>{seller.firstName} {seller.lastName}</td>
				<td>{seller.username}</td>
		  </tr>
    );
  }
}
