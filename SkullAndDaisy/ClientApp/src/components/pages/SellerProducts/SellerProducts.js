import React from 'react';
import './SellerProducts.scss';
import getAllProducts from '../../../helpers/data/productRequests';

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
    return (
      <div className='customer-orders'>
        <h1>Seller Products</h1>
      </div>
    );
  }
}

export default SellerProducts;
