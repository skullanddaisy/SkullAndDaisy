import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import productShape from '../../helpers/props/productShape';
import SearchProductItem from '../SearchProductItem/SearchProductItem';
import './SearchTable.scss';

export default class SearchTable extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(productShape),
  }

  render() {
    const { products } = this.props;

    const searchProductItemComponents = products.map(product => (
      <SearchProductItem
        product={product}
        key={product.id}
      />
    ));

    return (
        <Table striped className="searchTable">
          <thead className="tableHeader">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="searchText">
            {searchProductItemComponents}
          </tbody>
        </Table>
    );
  }
}
