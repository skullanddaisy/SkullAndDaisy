import React from 'react';
import productShape from '../../helpers/props/productShape';
import formatPrice from '../../helpers/formatPrice';
import './CartProductItem.scss';

class CartProductItem extends React.Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;
    return (
      <tr className="cart-item">
      <tb><img className='product-img' src={product.imageUrl} alt='this is a product' /></tb>
      <th scope="row"><div>{product.title}</div>{product.description}</th>
      <td>{product.quantity}</td>
      <td>{product.productTypeId}</td>
      <td>{formatPrice(product.price)}</td>
      <td>
        <button className="btn btn-default">
            <i className="fas fa-trash-alt"></i>
        </button>
        <button className="btn btn-default">
            <i className="fas fa-pencil-alt"></i>
        </button>
      </td>
    </tr>
    );
  }
}

export default CartProductItem;