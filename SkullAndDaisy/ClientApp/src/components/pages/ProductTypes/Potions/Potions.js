import React from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import ProductRequest from '../../../../helpers/data/productRequests';
import './Potions.scss';

class Potions extends React.Component {
    state = {
        filteredProducts: []
    }
    
    componentDidMount() {
        ProductRequest.getProductsByType(1)
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
            <div className='potions-page'>
                <h1>Potions</h1>
                <div className="potionsContainer">
                    {filteredProductItemComponents}
                </div>
            </div>
        );
    }
}

export default Potions;
