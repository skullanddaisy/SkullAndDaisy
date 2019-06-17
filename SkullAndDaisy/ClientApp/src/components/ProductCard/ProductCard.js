import React from 'react';
import productShape from '../../helpers/props/productShape';
import './ProductCard.scss';
import { Link } from 'react-router-dom';


class ProductCard extends React.Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;

    const productDetails = `productdetails/${product.id}`

    return (
      <Link to={productDetails}>
        <div id={product.id} className="productCard" onClick={this.setProductId}>
          <div>
            <div className="imageDiv">
              <img className='productImg' top src={product.imageUrl} alt={product.title} />
            </div>
            <div className="cardBody">
              <p className="productTitle">{product.title}</p>
              <div className="productPrice">${product.price}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
