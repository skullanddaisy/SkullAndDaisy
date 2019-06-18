import React from 'react';
import productShape from '../../helpers/props/productShape';

class ProductItem extends React.Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;

    return (
     <div className='productCard'>
      <img className='product-img' src={product.imageUrl} alt='product' />
     </div>
    );
  }
}

export default ProductItem;
