// import React, { Component } from 'react'

// export default class SellerStore extends Component {
// 	state = {
// 		products: [],
// 		userId: 0,
// 	}

// 	componentDidMount() {
// 		userRequests.getUserIdByEmail()
// 		  .then((userId) => {
// 			this.setState({ userId });
// 			productRequests.getSellersProducts(this.state.userId)
// 			  .then((products) => {
// 				this.setState({ products });
// 			  })
// 			  .catch(err => console.error('error in getting products', err));
// 		  }).catch((error) => {
// 			console.error(error);
// 		  }
// 		);
// 	  }

// 	render() {
// 		const productItemComponents = this.state.products.map(product => (
//             <ProductCard
//               product={product}
//               key={product.id}
// 			  />));
			  
// 		return (
// 			<div>
// 				<h1>Products</h1>
//                 <div className="potionsContainer">
//                     {productItemComponents}
//                 </div>
// 			</div>
// 		)
// 	}
// }
