import React from 'react';
import ProductRequest from '../../../helpers/data/productRequests';
import productShape from '../../../helpers/props/productShape';

class ProductDetails extends React.Component{
	
	state = {
		product: productShape,
	}
	

	componentDidMount() {
		ProductRequest.getProductById(1)
		.then((productById) => {
			this.setState({ product: productById});
		})
	}

	render() {
		
		
		
		const { product } = this.state;
		return(
			<div className="productContainer">
				<div className="productBanner"></div>
				<div id={product.id} className="productCard" onClick={this.setProductId}>
					<div>
						<div className="imageDiv">
							<img className='productImg' top src={product.imageUrl} alt={product.title} />
						</div>
						<div className="cardBody">
							<a className="productTitle" href="">{product.title}</a>
							<div className="productPrice">${product.price}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductDetails;