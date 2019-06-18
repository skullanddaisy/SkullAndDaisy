import React from 'react';
import moment from 'moment';
import ProductItem from '../ProductItem/ProductItem';
import orderShape from '../../helpers/props/orderShape';
import './OrderItem.scss';

class OrderItem extends React.Component {
  static propTypes = {
    order: orderShape,
  }

  render() {
    const { order } = this.props;

    const productItemComponents = order.products.map(product => (
      <ProductItem
        product={product}
        key={product.id}
      />
    ));

    return (
     <div className='orderCard'>
      <p>Ordered {moment(order.orderDate).format('MMMM Do YYYY')}</p>
      <div>{productItemComponents}</div>
     </div>
    );
  }
}

export default OrderItem;
