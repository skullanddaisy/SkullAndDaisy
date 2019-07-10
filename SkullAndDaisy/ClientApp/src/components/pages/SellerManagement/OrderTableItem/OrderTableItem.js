import React, { Component } from 'react';
import moment from 'moment';

import formatPrice from '../../../../helpers/formatPrice';

export default class OrderTableItem extends Component {
  render() {
    const { item, shipIt } = this.props;

    const shipItEvent = (e) => {
      e.preventDefault();
      const itemId = e.target.id;
      shipIt(itemId);
    };

    return (
      <tr className="order-item">
              <td>
                <input type="checkbox" className="form-check-input" id={item.Id} onClick={shipItEvent} />
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
