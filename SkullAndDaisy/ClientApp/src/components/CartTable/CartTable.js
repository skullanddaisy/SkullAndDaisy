import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import productShape from '../../helpers/props/productShape';
import CartProductItem from '../CartProductItem/CartProductItem';
import './CartTable.scss';

export default class CartTable extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(productShape),
  }

  render() {
    const { products } = this.props;

    const cartProductItemComponents = products.map(product => (
      <CartProductItem
        product={product}
        key={product.id}
      />
    ));

    return (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Qty</th>
              <th>Category</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartProductItemComponents}
          </tbody>
        </Table>
      </div>
    );
  }
}
