import React from 'react';
import PropTypes from 'prop-types';
import productShape from '../../helpers/props/productShape';
import orderShape from '../../helpers/props/orderShape';
import formatPrice from '../../helpers/formatPrice';
import formatProductType from '../../helpers/formatProductType';
import productOrderRequests from '../../helpers/data/productOrderRequests';
import './CartProductItem.scss';

class CartProductItem extends React.Component {
  static propTypes = {
    product: productShape,
    cartHomeView: PropTypes.bool,
    deleteProduct: PropTypes.func,
    pendingOrder: orderShape,
  }

  deleteProductEvent = () => {
    const { product, pendingOrder, deleteProduct } = this.props;
    const productId = product.id;
    const orderId = pendingOrder.id;
    productOrderRequests.getProductOrderByIds(orderId, productId)
      .then((result) => {
        const productOrder = result.data;
        deleteProduct(productOrder.id);
      }).catch();
  }

  render() {
    const { product, cartHomeView } = this.props;

    if (cartHomeView === true) {
      return (
        <tr className="cart-item">
        <tb><img className='cartHomeImg' src={product.imageUrl} alt='this is a product' /></tb>
          <th>{product.title}</th>
          <td>{product.quantity}</td>
          <td>{formatPrice(product.price)}</td>
        </tr>
      );
    }

    return (
      <tr className="cart-item">
      <tb><img className='product-img' src={product.imageUrl} alt='this is a product' /></tb>
      <th><div className='mb-2'>{product.title}</div>{product.description}</th>
      <td>{product.quantity}</td>
      <td>{formatProductType(product.productTypeId)}</td>
      <td>{formatPrice(product.price)}</td>
      <td>
        <button className="btn btn-default" onClick={this.deleteProductEvent}>
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
