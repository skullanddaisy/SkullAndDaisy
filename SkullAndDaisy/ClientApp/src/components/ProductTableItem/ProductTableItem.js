import React, { Component } from 'react';

import productShape from '../../helpers/props/productShape';
import formatPrice from '../../helpers/formatPrice';
import formatProductType from '../../helpers/formatProductType';

export default class ProductTableItem extends Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;

    return (
      <tr className="inventory-item">
        <td>
          <button className="btn btn-default">
              <i className="fas fa-trash-alt"></i>
          </button>
          <button className="btn btn-default">
              <i className="fas fa-pencil-alt"></i>
          </button>
        </td>
        <th scope="row">{product.quantity}</th>
        <td>{product.title}</td>
        <td>{formatProductType(product.productTypeId)}</td>
        <td>{formatPrice(product.price)}</td>
      </tr>
    );
  }
}
