import React from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import ProductRequest from '../../../../helpers/data/productRequests';
import './Crystals.scss';

class Crystals extends React.Component {
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
        const filteredProductItemComponents = this.state.filteredProducts.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              />));
        return (
            <div className='crystals-page'>
                <h1>Crystals</h1>
                <div className="crystalsContainer">
                    {filteredProductItemComponents}
                </div>
            </div>
        );
    }
}

export default Crystals;
