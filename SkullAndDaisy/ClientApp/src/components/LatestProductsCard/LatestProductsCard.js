import React from 'react';
import ProductRequest from '../../helpers/data/productRequests';
import ProductCard from '../ProductCard/ProductCard';
import './LatestProductsCard.scss';

class LatestProductsCard extends React.Component {
  state = {
    latestProducts: [],
  }
  
  
  componentDidMount(){
    ProductRequest.getLatestProducts()
      .then((products) => {
        this.setState({latestProducts: products})
      })
    .catch((err) => console.error("Could not get products", err));
  }

  render() {
    const carouselItemComponents = this.state.latestProducts.map(product => (
      <ProductCard
        product={product}
        key={product.id}
      />));
    return (
      <div className='latest-products-card'>
        {carouselItemComponents}
      </div>
    );
  }
}

export default LatestProductsCard;