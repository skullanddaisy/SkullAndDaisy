import React from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import ProductRequest from '../../../../helpers/data/productRequests';
import './Herbs.scss';

class Herbs extends React.Component {
    state = {
        filteredProducts: []
    }
    
    componentDidMount() {
        ProductRequest.getProductsByType(3)
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
            <div className='herbs-page'>
                <h1>Herbs</h1>
                <div className="herbsContainer">
                    {filteredProductItemComponents}
                </div>
            </div>
        );
    }
}

export default Herbs;
