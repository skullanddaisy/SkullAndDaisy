import React, { Component } from 'react';
import PropTypes from 'prop-types';

import productShape from '../../helpers/props/productShape';
import formatPrice from '../../helpers/formatPrice';
import formatProductType from '../../helpers/formatProductType';

import './ProductTableItem.scss';

export default class ProductTableItem extends Component {
  static propTypes = {
    product: productShape,
    deleteSingleProduct: PropTypes.func,
    passProductToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleProduct, product } = this.props;
    deleteSingleProduct(product.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { editForm, product } = this.props;
    editForm(product.id);
  }

  render() {
    const { product } = this.props;

    return (
      <tr className="inventory-item">
        <td>
          <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-trash-alt icon"></i>
          </button>
          <button className="btn btn-default" onClick={this.editEvent}>
              <i className="fas fa-pencil-alt icon"></i>
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
