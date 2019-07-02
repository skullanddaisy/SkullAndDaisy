/* eslint-disable no-tabs */
/* eslint-disable indent */
import React from 'react';
import {
	Button,
	Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ProductRequest from '../../../helpers/data/productRequests';
import productShape from '../../../helpers/props/productShape';
import orderRequests from '../../../helpers/data/orderRequests';
import productOrderRequests from '../../../helpers/data/productOrderRequests';
import './ProductDetails.scss';
import userRequests from '../../../helpers/data/userRequests';
import LatestProducts from '../Home/LatestProductsCard/LatestProductsCard';
import soldOutStamp from '../../../img/sold-out-stamp-1.png';

const defaultProductOrder = {
	orderId: 0,
	productId: 0,
	quantity: 0,
  };

class ProductDetails extends React.Component {
	state = {
		product: productShape,
		products: [],
		sellerId: 0,
		seller: {},
		user: {},
		potions: [],
		crystals: [],
		poisons: [],
		herbs: [],
		userId: 0,
		newProductOrder: defaultProductOrder,
		quantity: 1,
		showAlert: false,
	}

	componentDidMount() {
		// const { sellerId } = this.state;
		const productId = this.props.match.params.id;
		ProductRequest.getProductById(productId)
		.then((productById) => {
			this.setState({ product: productById });
			this.setState({ sellerId: productById.userId });
			userRequests.getUserById(this.state.sellerId)
				.then((theSeller) => {
					this.setState({ seller: theSeller });
					ProductRequest.getSellersProducts(theSeller.id)
						.then((productsByUserId) => {
							this.setState({ products: productsByUserId });
						})
					.catch((err) => {
					console.error("Wasn't able to get seller products.", err);
				});
			});
		});
		userRequests.getUserIdByEmail()
			.then((userId) => {
			this.setState({ userId });
			}).catch((error) => {
			console.error(error);
			});
	}

  onDismiss = () => {
    this.setState({ showAlert: false });
  }

	quantityChange = (e) => {
		let quantity = { ...this.state.quantity };
		quantity = e.target.value * 1;
		this.setState({ quantity });
	};

	addToCart = () => {
		orderRequests.getPendingOrder(this.state.userId)
			.then((result) => {
			const pendingOrder = result.data;
			const orderProducts = pendingOrder[0].products;
			let matchingProduct;
			for (let i = 0; i < orderProducts.length; i += 1) {
				if (orderProducts[i].id === this.state.product.id) {
				matchingProduct = orderProducts[i];
				}
			}
			if (matchingProduct === undefined) {
				const newProductOrder = { ...this.state.newProductOrder };
				newProductOrder.productId = this.state.product.id;
				newProductOrder.orderId = pendingOrder[0].id;
				newProductOrder.quantity = this.state.quantity;
				this.setState({ newProductOrder, showAlert: true });
				productOrderRequests.addProductOrder(this.state.newProductOrder).then();
			} else {
				productOrderRequests.getProductOrderByIds(pendingOrder[0].id, matchingProduct.id)
				.then((res) => {
				const productOrder = res.data;
				productOrder.quantity = this.state.quantity + productOrder.quantity;
				productOrderRequests.updateProductOrder(productOrder).then();
				}).catch();
			}
			}).catch();
		}

	render() {
		const {
			product,
			seller,
			showAlert,
			quantity,
} = this.state;

		const sellerStore = `/sellerstore/${seller.id}`;

		userRequests.getUserById(2)
			.then((theUser) => {
				this.setState({ user: theUser });
		});

      const makeAlert = () => {
        if (showAlert) {
          return <Alert className='alert' color="success" toggle={this.onDismiss}>
          Added {product.title} to your cart!
          </Alert>;
        }
        return <div></div>;
      };

		return (
			<div className="productDetailsContainer1">
          {makeAlert()}
				<div className="productDetailsContainer">
					<div id="leftCol" className="leftCol">
					<div id="soldOutDiv">
						<img id="theStamp" src={soldOutStamp} alt="sold out"></img>
					</div>
						<div className="imageDiv">
							<img className='productDetailImg' src={product.imageUrl} alt={product.title} />
						</div>
					</div>
					<div id="middleCol" className="middleCol">
						<h1 className="productTitle">{product.title}</h1>
						<hr id="productDetailTitleLine"></hr>
						<div id="priceAndQuantityDiv">
							<div className="listPrice">List Price: <span id="productDetailPrice">${product.price}</span></div>
							<div id="quantityDiv">
								Qty: <input id="quantityInput"
												value={quantity}
                        onChange={this.quantityChange}>
                      </input>
							</div>
						</div>
						<div id="soldBy">
							<div className="mr-3">Sold by: </div>
							<Link to={sellerStore}>
								{seller.username}
							</Link>
						</div>
						<div id="descriptionHeader">Description:</div>
						<div id="productDetails">{product.description}</div>
						<div className="productDetailsButtonContainer">
							<Button className="productDetailsButton" onClick={this.addToCart}>Add to Cart</Button>
							<Button className="productDetailsButton">Add to Wish List</Button>
						</div>
					</div>
					<hr id="productDetailLine"></hr>
					<h1 className="latestProductsTextx">Latest Products</h1>
					<LatestProducts />
					{/* {productPotionComponents} */}
				</div>
			</div>
		);
	}
}
export default ProductDetails;
