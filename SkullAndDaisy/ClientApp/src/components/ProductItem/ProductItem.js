import React from 'react';
import productShape from '../../helpers/props/productShape';
import {Link} from 'react-router-dom';

class ProductItem extends React.Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;
    const productDetails = `/productdetails/${product.id}`;

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
          <h5>${product.price}</h5>
        </div>
     </div>
    );
  }
}

export default ProductItem;
