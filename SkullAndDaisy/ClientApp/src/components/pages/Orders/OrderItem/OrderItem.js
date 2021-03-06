import React from 'react';
import moment from 'moment';
import { Button } from 'reactstrap';
import ProductItem from '../ProductItem/ProductItem';
import orderShape from '../../../../helpers/props/orderShape';
import './OrderItem.scss';

class OrderItem extends React.Component {
  static propTypes = {
    order: orderShape,
  }

  state = {
    orderProducts: [],
    numberOfProducts: 0,
    productQuantity: 0,
    firstProduct: [],
    showMore: false,
  }

  componentDidMount() {
    this.countProducts();
  }

  showMore = () => {
    this.setState({ showMore: true });
  }

  showLess = () => {
    this.setState({ showMore: false });
  }

  countProducts = () => {
    let numberOfProducts = 0;
    let productQuantity = 0;
    const theProducts = this.props.order.products;
    for (let i = 0; i < theProducts.length; i += 1) {
      numberOfProducts += 1;
      productQuantity += theProducts[i].quantity;
    }
    this.setState({ numberOfProducts, productQuantity });
    const productObject = theProducts[0];
    const firstProduct = [];
    firstProduct.push(productObject);
    this.setState({ firstProduct });
  }

  render() {
    const { order } = this.props;

    const {
      numberOfProducts,
      firstProduct,
      showMore,
      productQuantity,
    } = this.state;

    const makeProductItemComponents = () => {
      if (showMore === true) {
        const itemComponent = order.products.map(product => (
          <ProductItem
            product={product}
            orderId={order.id}
            key={product.id}
          />
        ));
        return itemComponent;
      }
      const itemComponents = firstProduct.map(product => (
        <ProductItem
          product={product}
          orderId={order.id}
          key={product.id}
        />
      ));
      return itemComponents;
    };

    const makeShowButtons = () => {
      if (showMore) {
        return <div className='d-flex justify-content-end p-3'>
                  <Button onClick={this.showLess}>Show Less</Button>
               </div>;
      }
      return <div className='d-flex justify-content-end p-3'>
               <Button onClick={this.showMore}>Show More</Button>
             </div>;
    };

    const showQuantity = () => {
      if (productQuantity === 1) {
        return <h3 className='text-right p-3'>{productQuantity} item</h3>;
      }
      return <h3 className='text-right p-3'>{productQuantity} items</h3>;
    };

    if (numberOfProducts === 1) {
      return (
        <div className='orderCard m-4'>
          <div className='d-flex flex-wrap justify-content-between'>
            <h3 className='text-left p-3'>Ordered {moment(order.orderDate).format('MMMM Do YYYY')}</h3>
            {showQuantity()}
          </div>
          {makeProductItemComponents()}
        </div>
      );
    }

    return (
      <div className='orderCard m-4'>
        <div className='d-flex flex-wrap justify-content-between'>
          <h3 className='text-left p-3'>Ordered {moment(order.orderDate).format('MMMM Do YYYY')}</h3>
          {showQuantity()}
        </div>
       {makeProductItemComponents()}
       {makeShowButtons()}
      </div>
    );
  }
}

export default OrderItem;
