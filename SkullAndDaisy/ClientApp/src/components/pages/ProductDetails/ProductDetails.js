import React from 'react';


class ProductDetails extends React.Component{
	
	
	
	
	
	render() {
		const { product } = this.props;

		return(
			<div className="productBanner">{product.title}
				
			</div>
		);
	}
}

export default ProductDetails;