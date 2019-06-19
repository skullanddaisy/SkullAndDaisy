import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import userRequests from '../../helpers/data/userRequests';
import productRequests from '../../helpers/data/productRequests';

const defaultProduct = {
  title: '',
  description: '',
  price: 0,
  productTypeId: 0,
  quantity: 0,
  userId: '',
  imageUrl: '',
};

class InventoryModal extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    modal: 'false',
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newProduct: defaultProduct,
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct[name] = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  formFieldNumberState = (name, e) => {
    const tempProduct = { ...this.state.newProduct };
    tempProduct[name] = e.target.value * 1;
    this.setState({ newProduct: tempProduct });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      newProduct: defaultProduct,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ modal: props.modal });
    this.setState({ newProduct: this.props.productToEdit });
  }


  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      productRequests.getSingleProduct(editId)
        .then((product) => {
          this.setState({ newProduct: product.data });
        })
        .catch(err => console.error('error with get single', err));
    }
  }

  titleChange = e => this.formFieldStringState('title', e);

  descriptionChange = e => this.formFieldStringState('description', e);

  priceChange = e => this.formFieldNumberState('price', e);

  productTypeIdChange = e => this.formFieldNumberState('productTypeId', e);

  quantityChange = e => this.formFieldNumberState('quantity', e);

  imageUrlChange = e => this.formFieldStringState('imageUrl', e);

  formSubmit = (e) => {
    const { onSubmit } = this.props;
    this.setState({ modal: 'false' });
    const myProduct = { ...this.state.newProduct };
    userRequests.getUserIdByEmail()
      .then((userId) => {
        myProduct.userId = userId;
        onSubmit(myProduct);
      })
      .catch((err) => {});
    this.setState({ newProduct: defaultProduct });
    this.props.closeModal();
  }

  render() {
    const { newProduct } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h2>Edit Product</h2>;
      }
      return <h2>Add New Product</h2>;
    };

    return (
      <div>
        <Button color="secondary" className="add-button" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{title()}</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  maxLength="19"
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="titleHelp"
                  value={newProduct.title}
                  onChange={this.titleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  aria-describedby="descriptionHelp"
                  value={newProduct.description}
                  onChange={this.descriptionChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Price:</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  aria-describedby="priceHelp"
                  value={newProduct.price}
                  onChange={this.priceChange}
                />
              </div>
              <FormGroup tag="fieldset">
                <legend>Product Category</legend>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" value="1" checked={newProduct.productTypeId === 1} onChange={this.productTypeIdChange}/>{' '}
                    Potion
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" value="2" checked={newProduct.productTypeId === 2} onChange={this.productTypeIdChange}/>{' '}
                    Poison
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" value="3" checked={newProduct.productTypeId === 3} onChange={this.productTypeIdChange}/>{' '}
                    Herb
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" value="4" checked={newProduct.productTypeId === 4} onChange={this.productTypeIdChange}/>{' '}
                    Healing Crystal
                  </Label>
                </FormGroup>
              </FormGroup>
              <div className="form-group">
                <label htmlFor="imageUrl">Quantity:</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  aria-describedby="quantityHelp"
                  value={newProduct.quantity}
                  onChange={this.quantityChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image Url:</label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  aria-describedby="imageUrlHelp"
                  value={newProduct.imageUrl}
                  onChange={this.imageUrlChange}
                />
              </div>
              <Button color="secondary" onClick={(e) => {
                this.toggle();
                this.formSubmit();
              }}>Save Product</Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default InventoryModal;
