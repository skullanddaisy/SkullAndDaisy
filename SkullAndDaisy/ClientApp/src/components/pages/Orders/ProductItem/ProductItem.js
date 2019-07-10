import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import productShape from '../../../../helpers/props/productShape';
import formatPrice from '../../../../helpers/formatPrice';
import productOrderRequests from '../../../../helpers/data/productOrderRequests';

class ProductItem extends React.Component {
  static propTypes = {
    product: productShape,
    orderId: PropTypes.number,
  }

  state = {
    isShipped: false,
  }

  componentDidMount() {
    const { product, orderId } = this.props;
    productOrderRequests.getProductOrderByIds(orderId, product.id)
      .then((result) => {
        const productOrder = result.data;
        this.setState({ isShipped: productOrder.shipped });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { product } = this.props;
    const { isShipped } = this.state;
    const productDetails = `/productdetails/${product.id}`;
    const productPrice = product.price * product.quantity;

    const makeStatus = () => {
      if (isShipped) {
        return <p className='text-success'>Status: Shipped</p>;
      }
      return <p className='text-danger'>Status: Pending</p>;
    };

    return (
     <div className='d-flex flex-wrap'>
        <Link to={productDetails}>
          <div>
            <img className='product-img' src={product.imageUrl} alt='product' />
          </div>
        </Link>
        <div className='productDetails ml-5 mt-2 text-left'>
          <Link to={productDetails}>
            <h3>{product.title}</h3>
          </Link>
          <p>{product.description}</p>
          <p>Qty: {product.quantity}</p>
          <h5>{formatPrice(productPrice)}</h5>
          {makeStatus()}
        </div>
     </div>
    );
  }
}

export default ProductItem;
