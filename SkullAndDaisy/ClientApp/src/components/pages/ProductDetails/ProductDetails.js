import React from 'react';
import ProductRequest from '../../../helpers/data/productRequests';
import productShape from '../../../helpers/props/productShape';
import ProductCard from '../../ProductCard/ProductCard';
import './ProductDetails.scss';
import {
	Button,
} from 'reactstrap';
import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css'

class ProductDetails extends React.Component{
	
	state = {
		product: productShape,
		potions: [],
		crystals: [],
		poisons: [],
		herbs: [],
	}
	
	componentDidMount() {
		let productId = this.props.match.params.id;
		ProductRequest.getProductById(productId)
		.then((productById) => {
			this.setState({ product: productById});
		})
		ProductRequest.getProductsByType(1)
			.then((potions) => {
				this.setState({potions: potions});
			})
		.catch((err) => console.error("Wasn't able to get potions.", err));
	}

	render() {
		
		const { product } = this.state;
		const carouselPotionComponents = this.state.potions.map(product => (
			<ProductCard
			  product={product}
			  key={product.id}
			  />));
		return(
			<div className="productDetailsContainer1">
				<div className="productDetailsContainer">
					<div id="leftCol" className="leftCol">
						<div className="imageDiv">
							<img className='productDetailImg' top src={product.imageUrl} alt={product.title} />
						</div>
					</div>
					<div id="middleCol" className="middleCol">
						<h1 className="productTitle">{product.title}</h1>
						<hr id="productDetailTitleLine"></hr>
						<div id="priceAndQuantityDiv">
							<div className="listPrice">List Price: <span id="productDetailPrice">${product.price}</span></div>
							<div id="quantityDiv">
								Qty: <input id="quantityInput"
											value={1}>
									 </input>
							</div>
						</div>
						<div id="descriptionHeader">Description:</div>
						<div id="productDetails">{product.description}</div>
						<div className="productDetailsButtonContainer">
							<Button className="productDetailsButton">Add to Cart</Button>
							<Button className="productDetailsButton">Add to Wish List</Button>
						</div>
					</div>
					<hr id="productDetailLine"></hr>
				</div>
			</div>
		);
	}
}

export default ProductDetails;