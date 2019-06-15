import React, { Component } from 'react';
import { Table } from 'reactstrap';
import OrderTableItem from '../OrderTableItem/OrderTableItem';
import './OrdersTable.scss';

export default class OrdersTable extends Component {
  render() {
    const { unshippedOrders } = this.props;

    const orderTableComponents = unshippedOrders.map(order => (
      <OrderTableItem
        order={order}
        key={order.id}
      />
    ));

    return (
      <div className="col ml-5 mr-5">
        <div className="row d-flex justify-content-center mb-4">
          <h2 className="mr-5">Unshipped Orders</h2>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Shipped</th>
              <th>Date</th>
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
