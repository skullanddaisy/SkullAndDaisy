import React, { Component } from 'react';
import moment from 'moment';

import formatPrice from '../../../../helpers/formatPrice';

export default class OrderTableItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <tr className="order-item">
              <td>
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              </td>
              <td>{moment(item.OrderDate).format('MMMM Do YYYY')}</td>
              <td>{item.Quantity}</td>
              <td>{item.Title}</td>
              <td>{item.FirstName} {item.LastName}</td>
              <td>{formatPrice(item.Price)}</td>
            </tr>
    );
  }
}
