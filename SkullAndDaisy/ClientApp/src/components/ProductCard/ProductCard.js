import React from 'react';
import PropTypes from 'prop-types';
import productShape from '../../helpers/props/productShape';
import './ProductCard.scss';

class ProductCard extends React.Component {
  static propTypes = {
    product: productShape,
    passProductToDetails: PropTypes.func,
  }

  // productDetailView = (e) => {
  //   e.preventDefault();
  //   const productId = this.props.product.id;
  //   this.props.passProductToDetails(productId);
  // }

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
