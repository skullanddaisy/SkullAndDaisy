import React from 'react';
import productShape from '../../helpers/props/productShape';
import './CartProductItem.scss';

class CartProductItem extends React.Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <img src={product.imageUrl} alt='this is a product' />
        <h4>{product.title}</h4>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.quantity}</p>
      </div>
    );
  }
}

export default CartProductItem;
