import React from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import ProductRequest from '../../../../helpers/data/productRequests';
import './Potions.scss';

class Potions extends React.Component {
    state = {
        filteredProducts: []
    }
    
    componentDidMount() {
        ProductRequest.getProductsByType(4)
            .then((filteredProducts) => {
                this.setState({filteredProducts});
            })
        .catch(err => console.error('error in getting filtered products', err));
    }

    render() {
        const filteredProductItemComponents = this.state.filteredProducts.map(filteredProduct => (
            <ProductCard
            filteredProduct={filteredProduct}
              key={filteredProduct.id}
              />));
        return (
            <div className='potions-page'>
                <h1>Potions</h1>
                {filteredProductItemComponents}
            </div>
        );
    }
}

export default Potions;
