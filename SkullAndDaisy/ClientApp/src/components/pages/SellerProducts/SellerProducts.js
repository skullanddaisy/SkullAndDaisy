import React from 'react';
import './SellerProducts.scss';
import getAllProducts from '../../../helpers/data/productRequests';
import ProductCard from '../../ProductCard/ProductCard';

class SellerProducts extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    getAllProducts()
      .then((products) => {
        this.setState({ products });
      })
      .catch(err => console.error('error in getting products', err));
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
