import React from 'react';
import { Row, Col } from 'reactstrap';
import productShape from '../../helpers/props/productShape';
import './CartProductItem.scss';

class CartProductItem extends React.Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;
    return (
      <div className='product-card mr-4 ml-4'>
        <Row className="m-3">
          <Col className='col-2'>
            <img className='product-img' src={product.imageUrl} alt='this is a product' />
          </Col>
          <Col className='col-1'>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
          </Col>
          <Col className='col-2'>
            <p>{product.quantity}</p>
          </Col>
          <Col className='col-2'>
            <p>${product.price}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CartProductItem;
