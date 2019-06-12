import React from 'react';
import './SellerProducts.scss';
import productRequests from '../../../helpers/data/productRequests';
import ProductCard from '../../ProductCard/ProductCard';
import userRequests from '../../../helpers/data/userRequests';

class SellerProducts extends React.Component {
  state = {
    products: [],
    userId: 0,
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        productRequests.getSellersProducts(this.state.userId)
          .then((products) => {
            this.setState({ products });
          })
          .catch(err => console.error('error in getting products', err));
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    const productItemComponents = this.state.products.map(product => (
        <ProductCard
          product={product}
          key={product.id}
          />
    ));

    return (
      <div className='customer-orders'>
        <h1>Seller Products</h1>
        <div className='ProductsList flex-wrap d-flex justify-content-center flex-row p-1'>
          {productItemComponents}
        </div>
      </div>
    );
  }
}

export default SellerProducts;
