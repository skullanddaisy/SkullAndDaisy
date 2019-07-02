import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import authRequests from '../../helpers/data/authRequests';
import userRequests from '../../helpers/data/userRequests';

const tempUser = {
  email: '',
  username: '',
  password: '',
  firstname: '',
  lastname: '',
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: tempUser,
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    this.setState({ user: tempUser });
  }

  registerClickEvent = (e) => {
    const { user } = this.state;
    const newUser = {};
    newUser.email = this.state.user.email;
    newUser.firstname = this.state.user.firstname;
    newUser.lastname = this.state.user.lastname;
    newUser.username = this.state.user.username;
    e.preventDefault();
    authRequests
      .registerUser(user)
      .then(() => {
        authRequests.getCurrentUserJwt();
        userRequests.createUser(newUser);
      })
      .catch((error) => {
        console.error('there was an error in registering', error);
      });
  };

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.user };
    tempUser[name] = e.target.value;
    this.setState({ user: tempUser });
  }


  emailChange = e => this.formFieldStringState('email', e);

  usernameChange = e => this.formFieldStringState('username', e);

  passwordChange = e => this.formFieldStringState('password', e);

  firstnameChange = e => this.formFieldStringState('firstname', e);

  lastnameChange = e => this.formFieldStringState('lastname', e);

  render() {
    const { user } = this.state;
    const buildModal = () => (
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Register a new Account!</ModalHeader>
        <ModalBody>
        <div className="Register">
        <Form id="login-form">
          <FormGroup className="form-group">
              <Label htmlFor="inputFirstname" className="col-sm-4 control-label">
                First Name:
              </Label>
                <Input
                  type="firstname"
                  className="form-control"
                  id="inputFirstname"
                  placeholder="Firstname"
                  value={user.firstname}
                  onChange={this.firstnameChange}
                />
            </FormGroup>
            <FormGroup className="form-group">
              <Label htmlFor="inputLastname" className="col-sm-4 control-label">
                Last Name:
              </Label>
                <Input
                  type="lastname"
                  className="form-control"
                  id="inputLastname"
                  placeholder="Lastname"
                  value={user.lastname}
                  onChange={this.lastnameChange}
                />
            </FormGroup>
              <Label htmlFor="inputUsername" className="col-sm-4 control-label">
                Username:
              </Label>
                <Input
                  type="username"
                  className="form-control"
                  id="inputUsername"
                  placeholder="Username"
                  value={user.username}
                  onChange={this.usernameChange}
                />
            <FormGroup className="form-group">
              <Label htmlFor="inputEmail" className="col-sm-4 control-label">
                Email:
              </Label>
                <Input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
            </FormGroup>
            <FormGroup className="form-group">
              <Label htmlFor="inputPassword" className="col-sm-4 control-label">
                Password:
              </Label>
                <Input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
            </FormGroup>
            <FormGroup className="form-group">
                <Button
                  type="submit"
                  className="btn btn-default col-xs-12"
                  onClick={this.registerClickEvent}
                >
                  Register
                </Button>
            </FormGroup>
        </Form>
      </div>
        </ModalBody>
        </Modal>
    );
    return (
        <div className="register">
        <div className='account'>
          <p><strong>Don't have an account?</strong> <Button className='btn btn-dark' onClick={this.toggle}>Register</Button></p>
        </div>
      <div>{buildModal()}</div>
      </div>
    );
  }
}

export default Register;
