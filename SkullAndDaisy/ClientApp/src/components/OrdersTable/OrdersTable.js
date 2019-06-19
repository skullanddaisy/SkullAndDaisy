import React, { Component } from 'react';
import { Table } from 'reactstrap';
import OrderTableItem from '../OrderTableItem/OrderTableItem';
import './OrdersTable.scss';

export default class OrdersTable extends Component {
  render() {
    const { unshippedItems } = this.props;

    const orderTableComponents = unshippedItems.map(item => (
      <OrderTableItem
        item={item}
        key={item.id}
      />
    ));

    return (
      <div className="col ml-5 mr-5">
        <div className="row d-flex justify-content-center mb-4">
          <h2 className="mr-5  table-contents">Items to Ship</h2>
        </div>
        <Table className="table-contents">
          <thead>
            <tr>
              <th>Shipped</th>
              <th>Date</th>
              <th>Qty</th>
              <th>Item</th>
              <th>Customer</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderTableComponents}
          </tbody>
        </Table>
      </div>
    );
  }
}
