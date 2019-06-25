import React, { Component } from 'react'
import ProductCard from '../../ProductCard/ProductCard';
import userRequests from '../../../helpers/data/userRequests';
import productRequests from '../../../helpers/data/productRequests';
import './SellerStore.scss';


export default class SellerStore extends Component {
	state = {
		products: [],
		userId: 0,
		seller: {}
	}


	componentDidMount() {
		const sellerId = this.props.match.params.id;
		userRequests.getUserById(sellerId)
		  .then((seller) => {
			this.setState({ seller });
			productRequests.getSellersProducts(this.state.seller.id)
			  .then((products) => {
				this.setState({ products });
			  })
			  .catch(err => console.error('error in getting products', err));
		  }).catch((error) => {
			console.error(error);
		});
	}

	render() {

		const {
			products,
			seller,
		} = this.state;

		const productItemComponents = products.map(product => (
            <ProductCard
              product={product}
			  key={product.id}
			  seller={seller}
			/>));
			  
		return (
			<div className="sellerStoreContainer">
				<h1>Seller Store</h1>
				<div className="cardContainer">
					<div className="sellerCard">
						<h1 className="sellerName">{seller.username}</h1>
						<div className="sellerImageDiv">
							<img className='sellerStoreImg' src='https://www.greenmangaming.com/newsroom/wp-content/uploads/2019/05/SonicAlt2.jpg' alt='the devil' />
						</div>
					</div>
				</div>
				<hr id="sellerProductsLine"></hr>
				<div>
					<h1>Products</h1>
					<div className="potionsContainer">
						{productItemComponents}
					</div>
				</div>
			</div>
		)
	}
}
