import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import productShape from '../../helpers/props/productShape';
import './ProductCard.scss';

class ProductCard extends React.Component {
  static propTypes = {
    product: productShape,
  }

  render() {
    const { product } = this.props;

    return (
      <div id={product.id} className="productCard">
      <Card>
        <CardImg className='product-img' top src={product.imageUrl} alt={product.title} />
        <CardBody>
          <CardTitle>{product.title}</CardTitle>
          <CardSubtitle>{product.price}</CardSubtitle>
          <CardText>{product.description}</CardText>
          <Button>Buy!!!!</Button>
        </CardBody>
      </Card>
    </div>
    );
  }
}

export default ProductCard;
