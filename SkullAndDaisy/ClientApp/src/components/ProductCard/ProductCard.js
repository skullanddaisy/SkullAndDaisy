import React from 'react';
import productShape from '../../helpers/props/productShape';
import './ProductCard.scss';

class ProductCard extends React.Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;

    return (
      <div id={product.id} className="productCard">
      <div>
        <div className="imageDiv">
          <img className='productImg' top src={product.imageUrl} alt={product.title} />
        </div>
        <div className="cardBody">
          <a className="productTitle" href="">{product.title}</a>
          <div className="productPrice">${product.price}</div>
        </div>
      </div>
    </div>
    );
  }
}

export default ProductCard;
