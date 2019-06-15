import React from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import ProductRequest from '../../../../helpers/data/productRequests';
import './Crystals.scss';

class Crystals extends React.Component {
    state = {
        products: []
    }
    
    componentDidMount() {
        ProductRequest.getProductsByType(4)
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
            <div className='crystals-page'>
                <h1>Crystals</h1>
                <div className="crystalsContainer">
                    {productItemComponents}
                </div>
            </div>
        );
    }
}

export default Crystals;
