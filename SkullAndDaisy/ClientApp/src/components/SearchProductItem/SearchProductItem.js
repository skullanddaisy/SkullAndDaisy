/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

import React from 'react';
import productShape from '../../helpers/props/productShape';
import formatPrice from '../../helpers/formatPrice';
import formatProductType from '../../helpers/formatProductType';

import './SearchProductItem.scss';

export default class SearchProductItem extends React.Component {
  static propTypes = {
    product: productShape,
  }


  render() {
    const { product } = this.props;
    const goToDetailsPage = () => {
      const productDetails = `productdetails/${product.id}`;
      window.location.assign(productDetails);
    };

    return (
			<tr className="searchTableItem" onClick={goToDetailsPage}>
				<tb><img className='searchImage' src={product.imageUrl} alt='this is a product' /></tb>
				<th><div className=''>{product.title}</div></th>
				<td>{formatProductType(product.productTypeId)}</td>
				<td>{formatPrice(product.price)}</td>
		</tr>
    );
  }
}
