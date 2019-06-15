import React from 'react';
import ProductRequest from '../../../helpers/data/productRequests';
import productShape from '../../../helpers/props/productShape';
import './ProductDetails.scss';


class ProductDetails extends React.Component{
	
	state = {
		product: productShape,
	}
	

	componentDidMount() {
		let productId = this.props.match.params.id;
		ProductRequest.getProductById(productId)
		.then((productById) => {
			this.setState({ product: productById});
		})
	}

	render() {
		
		const { product } = this.state;
		return(
			<div className="productDetailsContainer">
					<div id="leftCol" className="leftCol">
						<div className="imageDiv">
							<img className='productDetailImg' top src={product.imageUrl} alt={product.title} />
						</div>
					</div>
					<div id="middleCol" className="middleCol">
						<h1 className="productTitle">{product.title}</h1>
						<hr id="productDetailTitleLine"></hr>
						<div className="productPrice">List Price: <span id="productDetailPrice">${product.price}</span></div>
						<div id="productDetails">{product.description}</div>
					</div>
					<div id="rightCol" className="rightCol">
						<div id="addToCartCard" className="addToCartCard">
							<div className="cartCardPrice">{product.price}</div>
						</div>
					</div>
			</div>
		);
	}
}

export default ProductDetails;