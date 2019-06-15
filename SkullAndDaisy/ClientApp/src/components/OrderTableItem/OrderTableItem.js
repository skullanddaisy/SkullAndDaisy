import React, { Component } from 'react';
import moment from 'moment';

import formatPrice from '../../helpers/formatPrice';

export default class OrderTableItem extends Component {
  render() {
    const { order } = this.props;

    return (
      <tr className="order-item">
              <td>
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              </td>
              <td>{moment(order.orderDate).format('MMMM Do YYYY')}</td>
              <td>copyPasteDeveloper</td>
              <td>{formatPrice(order.total)}</td>
            </tr>
    );
  }
}
