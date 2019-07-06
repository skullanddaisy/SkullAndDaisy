import React from 'react';
import ProductRequest from '../../../../helpers/data/productRequests';
import ProductCard from '../../ProductDetails/ProductCard/ProductCard';
import './FeaturedListCard.scss';

class FeaturedListCard extends React.Component {
  state = {
    featuredProducts: [],
  }

  componentDidMount() {
    ProductRequest.getProductsByType(3)
      .then((products) => {
        this.setState({ featuredProducts: products });
      })
      .catch((err) => {
        console.error('Could not get products.', err);
      });
  }

  render() {
    const productItemComponents = this.state.featuredProducts.map(product => (
      <ProductCard
        product={product}
        key={product.id}
      />
    ));

    return (
      <div className='featured-list-card'>
        {productItemComponents}
      </div>
    );
  }
}

export default FeaturedListCard;
