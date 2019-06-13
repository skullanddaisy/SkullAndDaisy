import React from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import ProductRequest from '../../../../helpers/data/productRequests';
import './Poisons.scss';

class Poisons extends React.Component {
    state = {
        filteredProducts: []
    }
    
    componentDidMount() {
        ProductRequest.getProductsByType(2)
            .then((filteredProducts) => {
                this.setState({filteredProducts});
            })
        .catch(err => console.error('error in getting filtered products', err));
    }

    render() {
        const filteredProductItemComponents = this.state.filteredProducts.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              />));
        return (
            <div className='poisons-page'>
                <h1>Poisons</h1>
                <div className="poisonsContainer">
                    {filteredProductItemComponents}
                </div>
            </div>
        );
    }
}

export default Poisons;
