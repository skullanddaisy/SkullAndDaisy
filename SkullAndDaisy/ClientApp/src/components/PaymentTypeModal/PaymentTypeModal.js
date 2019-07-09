import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import userRequests from '../../helpers/data/userRequests';

const defaultPaymentType = {
  name: '',
  accountNumber: '',
  userId: 0,
  isActive: true,

};

class PaymentTypeModal extends React.Component {
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
      newPaymentType: defaultPaymentType,
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    const tempPaymentType = { ...this.state.newPaymentType };
    tempPaymentType[name] = e.target.value;
    this.setState({ newPaymentType: tempPaymentType });
  }

  formFieldNumberState = (name, e) => {
    const tempPaymentType = { ...this.state.newPaymentType };
    tempPaymentType[name] = e.target.value * 1;
    this.setState({ newPaymentType: tempPaymentType });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      newPaymentType: defaultPaymentType,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ modal: props.modal });
    this.setState({ newPaymentType: this.props.paymentTypeToEdit });
  }

  nameChange = e => this.formFieldStringState('name', e);

  accountNumberChange = e => this.formFieldStringState('accountNumber', e);

  isActiveChange = () => {
	  this.setState({ newPaymentType: !defaultPaymentType.isActive})
  }

  formSubmit = (e) => {
    const { onSubmit } = this.props;
    this.setState({ modal: 'false' });
    const myPaymentType = { ...this.state.newPaymentType };
    userRequests.getUserIdByEmail()
      .then((userId) => {
        myPaymentType.userId = userId;
        onSubmit(myPaymentType);
      })
      .catch((err) => {});
    this.setState({ newPaymentType: defaultPaymentType });
    this.props.closeModal();
  }

  render() {
    const { newPaymentType } = this.state;
    const { isEditing } = this.props;
    const name = () => {
      if (isEditing) {
        return <h2>Edit Payment Type</h2>;
      }
      return <h2>Add New Payment Type</h2>;
    };

    return (
      <div>
        <Button color="secondary" className="add-button" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{name()}</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  maxLength="55"
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="nameHelp"
                  value={newPaymentType.name}
                  onChange={this.nameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number:</label>
                <input
                  type="number"
                  className="form-control"
                  id="accountNumber"
                  aria-describedby="accountNumberHelp"
                  value={newPaymentType.accountNumber}
                  onChange={this.accountNumberChange}
                />
              </div>
              <Button color="primary" onClick={(e) => {
                this.toggle();
                this.formSubmit();
              }}>Save Payment Type</Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default PaymentTypeModal;
