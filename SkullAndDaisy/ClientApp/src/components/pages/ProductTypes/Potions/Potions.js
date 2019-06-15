import React from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import ProductRequest from '../../../../helpers/data/productRequests';
import './Potions.scss';

class Potions extends React.Component {
    state = {
        products: []
    }
    
    componentDidMount() {
        ProductRequest.getProductsByType(1)
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
            <div className='potions-page'>
                <h1>Potions</h1>
                <div className="potionsContainer">
                    {productItemComponents}
                </div>
            </div>
        );
    }
}

export default Potions;
