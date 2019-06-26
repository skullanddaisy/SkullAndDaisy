import React, { Component } from 'react';
import { Table } from 'reactstrap';
import SearchSellerItem from '../SearchSellerItem/SearchSellerItem';
import './SearchTableSellers.scss';

export default class SearchTableSellers extends Component {
  render() {
    const { sellers } = this.props;

    const searchSellerItemComponents = sellers.map(seller => (
      <SearchSellerItem
        seller={seller}
        key={seller.id}
      />
    ));

    return (
        <Table className="searchTable">
          <thead className="tableHeader">
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody className="searchText">
            {searchSellerItemComponents}
          </tbody>
        </Table>
    );
  }
}
