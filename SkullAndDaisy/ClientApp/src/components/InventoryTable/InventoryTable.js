import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import productShape from '../../helpers/props/productShape';
import ProductTableItem from '../ProductTableItem/ProductTableItem';
import './InventoryTable.scss';

export default class InventoryTable extends Component {
  static propTypes = {
    myInventory: PropTypes.arrayOf(productShape),
  }

  render() {
    const { myInventory } = this.props;

    const productTableComponents = myInventory.map(product => (
      <ProductTableItem
        product={product}
        key={product.id}
      />
    ));

    return (
      <div className="col ml-5 mr-5">
        <div className="row d-flex justify-content-center mb-4">
          <h2 className="mr-5">Inventory</h2>
        </div>
        <Table dark>
          <thead>
            <tr>
              <th></th>
              <th>Qty</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {productTableComponents}
          </tbody>
        </Table>
      </div>
    );
  }
}
