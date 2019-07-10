import React from 'react';
import moment from 'moment';
import { Button } from 'reactstrap';
import ProductItem from '../../Orders/ProductItem/ProductItem';
import orderShape from '../../../../helpers/props/orderShape';
import userRequests from '../../../../helpers/data/userRequests';
import './SoldItem.scss';

class SoldItem extends React.Component {
  static propTypes = {
    order: orderShape,
  }

  state = {
    orderProducts: [],
    customer: {},
    numberOfProducts: 0,
    productQuantity: 0,
    firstProduct: [],
    showMore: false,
  }

  getCustomer = () => {
    const customerId = this.props.order.userId;
    userRequests.getUserById(customerId)
      .then((customer) => {
        this.setState({ customer });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.countProducts();
    this.getCustomer();
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
      customer,
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
        <div className='soldCard m-4'>
          <div className='d-flex flex-wrap justify-content-between'>
            <h3 className='text-left p-3'>Ordered {moment(order.orderDate).format('MMMM Do YYYY')}</h3>
            {showQuantity()}
          </div>
          <div className='d-flex flex-wrap justify-content-between ml-3 mb-4'>
            <h5>Customer: {customer.firstName} {customer.lastName}</h5>
          </div>
          {makeProductItemComponents()}
        </div>
      );
    }

    return (
      <div className='soldCard m-4'>
        <div className='d-flex flex-wrap justify-content-between'>
        <h3 className='text-left p-3'>Ordered {moment(order.orderDate).format('MMMM Do YYYY')}</h3>
          {showQuantity()}
        </div>
        <div className='d-flex flex-wrap justify-content-between ml-3 mb-4'>
            <h5>Customer: {customer.firstName} {customer.lastName}</h5>
        </div>
        {makeProductItemComponents()}
        {makeShowButtons()}
      </div>
    );
  }
}

export default SoldItem;
