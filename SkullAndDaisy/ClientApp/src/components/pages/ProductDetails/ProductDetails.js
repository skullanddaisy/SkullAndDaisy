/* eslint-disable no-tabs */
/* eslint-disable indent */
import React from 'react';
import {
	Button,
	Alert,
} from 'reactstrap';
import ProductRequest from '../../../helpers/data/productRequests';
import productShape from '../../../helpers/props/productShape';
import ProductCard from '../../ProductCard/ProductCard';
import UserRequests from '../../../helpers/data/userRequests';
import orderRequests from '../../../helpers/data/orderRequests';
import productOrderRequests from '../../../helpers/data/productOrderRequests';
import './ProductDetails.scss';


const defaultProductOrder = {
  orderId: 0,
  productId: 0,
  quantity: 0,
};

class ProductDetails extends React.Component {
  state = {
    product: productShape,
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
    UserRequests.getUserIdByEmail()
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
          this.setState({ newProductOrder });
          productOrderRequests.addProductOrder(this.state.newProductOrder).then(() => {
           this.setState({ showAlert: true });
          });
        } else {
          productOrderRequests.getProductOrderByIds(pendingOrder[0].id, matchingProduct.id)
          .then((res) => {
            const productOrder = res.data;
            productOrder.quantity = this.state.quantity + productOrder.quantity;
            productOrderRequests.updateProductOrder(productOrder).then(() => {
              this.setState({ showAlert: true });
            });
          }).catch();
        }
      }).catch();
    }

	render() {
		const {
      product,
      user,
      showAlert,
      quantity,
    } = this.state;

		const productPotionComponents = this.state.potions.map(theProduct => (
			<ProductCard
			key={theProduct.id}
			product={theProduct}
			user={user}
			/>));

		UserRequests.getUserById(2)
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
                        onChange={this.quantityChange}>
                      </input>
							</div>
						</div>
						<div id="descriptionHeader">Description:</div>
						<div id="productDetails">{product.description}</div>
						<div className="productDetailsButtonContainer">
							<Button className="productDetailsButton" onClick={this.addToCart}>Add to Cart</Button>
							<Button className="productDetailsButton">Add to Wish List</Button>
						</div>
					</div>
					<hr id="productDetailLine"></hr>
					{productPotionComponents}
				</div>
			</div>
		);
	}
}

export default ProductDetails;
