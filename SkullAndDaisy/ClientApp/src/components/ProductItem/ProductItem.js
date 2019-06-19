import React from 'react';
import productShape from '../../helpers/props/productShape';

class ProductItem extends React.Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;

    return (
     <div className='d-flex flex-wrap'>
        <div>
            <img className='product-img' src={product.imageUrl} alt='product' />
        </div>
        <div className='productDetails ml-5 mt-2 text-left'>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Qty: {product.quantity}</p>
          <h5>${product.price}</h5>
        </div>
     </div>
    );
  }
}

export default ProductItem;
