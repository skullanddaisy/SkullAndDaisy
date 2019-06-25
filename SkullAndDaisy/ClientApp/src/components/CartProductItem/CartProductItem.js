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
    updateProduct: PropTypes.func,
    pendingOrder: orderShape,
  }

  state = {
    isEditing: false,
    quantity: 0,
  }

  componentDidMount() {
    const productQuantity = this.props.product.quantity;
    this.setState({ quantity: productQuantity });
  }

  updateProduct = () => {
    const { product, pendingOrder, updateProduct } = this.props;
    const productId = product.id;
    const orderId = pendingOrder.id;
    productOrderRequests.getProductOrderByIds(orderId, productId)
      .then((result) => {
        const productOrder = result.data;
        productOrder.quantity = this.state.quantity;
        updateProduct(productOrder);
        this.setState({ isEditing: false });
      }).catch();
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

  quantityChange = (e) => {
    let quantity = { ...this.state.quantity };
    quantity = e.target.value * 1;
    this.setState({ quantity });
  };

  saveChanges = () => {
    if (this.state.quantity === 0) {
      this.deleteProductEvent();
    } else {
      this.updateProduct();
    }
  }

  cancelChanges = () => {
    this.setState({ isEditing: false });
  }

  showEditForm = () => {
    this.setState({ isEditing: true });
  }


  render() {
    const { product, cartHomeView } = this.props;
    const { isEditing, quantity } = this.state;

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

    if (isEditing === true) {
      return (
        <tr className="cart-item">
        <tb><img className='product-img' src={product.imageUrl} alt='this is a product' /></tb>
        <th><div className='mb-2'>{product.title}</div>{product.description}</th>
        <td>
          <input
            className='quantityInput'
            value={quantity}
            onChange={this.quantityChange}>
          </input>
        </td>
        <td>{formatProductType(product.productTypeId)}</td>
        <td>{formatPrice(product.price)}</td>
        <td>
          <button className="btn btn-default" onClick={this.saveChanges}>
            <i class="fas fa-check-circle"></i>
          </button>
          <button className="btn btn-default" onClick={this.cancelChanges}>
            <i class="fas fa-times-circle"></i>
          </button>
        </td>
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
        <button className="btn btn-default" onClick={this.showEditForm}>
            <i className="fas fa-pencil-alt"></i>
        </button>
      </td>
    </tr>
    );
  }
}

export default CartProductItem;
