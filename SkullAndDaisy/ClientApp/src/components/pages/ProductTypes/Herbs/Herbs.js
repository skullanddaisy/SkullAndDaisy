import React from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import ProductRequest from '../../../../helpers/data/productRequests';
import './Herbs.scss';

class Herbs extends React.Component {
    state = {
        products: []
    }
    
    componentDidMount() {
        ProductRequest.getProductsByType(3)
            .then((products) => {
                this.setState({products});
            })
        .catch(err => console.error('error in getting filtered products', err));
    }

    render() {
        const productItemComponents = this.state.products.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              />));
        return (
            <div className='herbs-page'>
                <h1>Herbs</h1>
                <div className="herbsContainer">
                    {productItemComponents}
                </div>
            </div>
        );
    }
}

export default Herbs;
