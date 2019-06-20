/* eslint-disable no-tabs */
/* eslint-disable indent */
import React from 'react';
import {
	Button,
	Alert,
} from 'reactstrap';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import ProductRequest from '../../../helpers/data/productRequests';
import userRequests from '../../../helpers/data/userRequests';
import orderRequests from '../../../helpers/data/orderRequests';
import productOrderRequests from '../../../helpers/data/productOrderRequests';
import productShape from '../../../helpers/props/productShape';
import ProductCard from '../../ProductCard/ProductCard';
import './ProductDetails.scss';

import 'pure-react-carousel/dist/react-carousel.es.css';

const defaultProductOrder = {
  orderId: 0,
  productId: 0,
  quantity: 0,
};

class ProductDetails extends React.Component {
  state = {
    product: productShape,
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
    const productId = this.props.match.params.id;
    ProductRequest.getProductById(productId)
      .then((productById) => {
        this.setState({ product: productById });
      });
    ProductRequest.getProductsByType(1)
      .then((potions) => {
        this.setState({ potions });
      })
      .catch((err) => {
        console.error("Wasn't able to get potions.", err);
      });
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
      }).catch((error) => {
        console.error(error);
      });
  }

	quantityChange = (e) => {
		let quantity = { ...this.state.quantity };
		quantity = e.target.value;
		this.setState({ quantity });
	};

  addToCart = () => {
    orderRequests.getPendingOrder(this.state.userId)
      .then((result) => {
        const pendingOrder = result.data;
        const newProductOrder = { ...this.state.newProductOrder };
        newProductOrder.productId = this.state.product.id;
        newProductOrder.orderId = pendingOrder[0].id;
        newProductOrder.quantity = this.state.quantity;
        this.setState({ newProductOrder, showAlert: true });
        productOrderRequests.addProductOrder(this.state.newProductOrder).then();
      }).catch();
	}

	onDismiss = () => {
    this.setState({ showAlert: false });
  }

  render() {
    const {
			product,
			potions,
			showAlert,
			quantity,
		} = this.state;
    const carouselPotionComponents = potions.map(productObject => (
        <ProductCard
          product={productObject}
          key={product.id}
        />
    ));

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
													value={quantity}
													onChange={this.quantityChange}
												>
                     </input>
                </div>
              </div>
            <div id="descriptionHeader">Description:</div>
            <div id="productDetails">{product.description}</div>
            <div className="productDetailsButtonContainer">
              <Button onClick={this.addToCart} className="productDetailsButton">Add to Cart</Button>
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
