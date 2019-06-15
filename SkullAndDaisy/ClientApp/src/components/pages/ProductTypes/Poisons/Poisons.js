import React from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import ProductRequest from '../../../../helpers/data/productRequests';
import './Poisons.scss';

class Poisons extends React.Component {
    state = {
        products: []
    }
    
    componentDidMount() {
        ProductRequest.getProductsByType(2)
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
            <div className='poisons-page'>
                <h1>Poisons</h1>
                <div className="poisonsContainer">
                    {productItemComponents}
                </div>
            </div>
        );
    }
}

export default Poisons;
