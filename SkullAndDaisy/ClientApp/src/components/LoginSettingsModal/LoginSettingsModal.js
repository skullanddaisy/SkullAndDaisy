import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

const defaultUser = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  id: 0,
};

class LoginSettingsModal extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newUser: defaultUser,
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  toggle() {
    const tempUser = {};
    tempUser.username = this.props.currentUser.username;
    tempUser.email = this.props.currentUser.email;
    tempUser.firstName = this.props.currentUser.firstName;
    tempUser.lastName = this.props.currentUser.lastName;
    tempUser.password = this.props.currentUser.password;
    tempUser.id = this.props.currentUser.id;
    this.setState(prevState => ({
      modal: !prevState.modal,
      newUser: tempUser,
    }));
  }

  usernameChange = e => this.formFieldStringState('username', e);

  emailChange = e => this.formFieldStringState('email', e);

  firstNameChange = e => this.formFieldStringState('firstName', e);

  lastNameChange = e => this.formFieldStringState('lastName', e);

  passwordChange = e => this.formFieldStringState('password', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myUser = { ...this.state.newUser };
    onSubmit(myUser);
    this.setState({ newUser: defaultUser });
  }

  render() {
    const { newUser } = this.state;
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Login Settings</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="Username">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  aria-describedby="usernameHelp"
                  value={newUser.username}
                  onChange={this.usernameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Email">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={newUser.email}
                  onChange={this.emailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="FirstName">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  aria-describedby="firstNameHelp"
                  value={newUser.firstName}
                  onChange={this.firstNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="LastName">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  aria-describedby="lastNameHelp"
                  value={newUser.lastName}
                  onChange={this.lastNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Password">Password:</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  aria-describedby="passwordHelp"
                  value={newUser.password}
                  onChange={this.passwordChange}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => {
              this.toggle();
              this.formSubmit();
              e.preventDefault();
            }}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LoginSettingsModal;
