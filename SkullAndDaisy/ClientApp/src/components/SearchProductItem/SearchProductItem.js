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

	return (
		<tr className="">
			<tb><img className='searchImage' src={product.imageUrl} alt='this is a product' /></tb>
			<th><div className=''>{product.title}</div>{product.description}</th>
			<td>{formatProductType(product.productTypeId)}</td>
			<td>{formatPrice(product.price)}</td>
		</tr>
	  );
	}
}
