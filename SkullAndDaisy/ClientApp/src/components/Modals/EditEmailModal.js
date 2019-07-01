import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const defaultUser = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  id: 0,
};

class EditEmailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newUser: defaultUser,
      user: {
        email: '',
        password: '',
      },
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  emailChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  toggle() {
    const tempUser = {};
    tempUser.username = this.props.currentUser.username;
    tempUser.email = this.props.currentUser.email;
    tempUser.firstName = this.props.currentUser.firstName;
    tempUser.lastName = this.props.currentUser.lastName;
    tempUser.id = this.props.currentUser.id;
    this.setState(prevState => ({
      modal: !prevState.modal,
      newUser: tempUser,
    }));
  }

  formSubmit = (e) => {
    const { onSubmit, changeEmail } = this.props;
    const user = { ...this.state.user };
    const myUser = { ...this.state.newUser };
    myUser.email = user.email;
    myUser.password = user.password;
    const userId = this.props.currentUser.id;
    onSubmit(myUser, userId);
    changeEmail(user.password, user.email);
    this.setState({ newUser: defaultUser });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Change your email</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="inputPassword">Verify password to continue</Label>
              <Input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  aria-describedby="passwordHelp"
                  value={user.password}
                  onChange={this.passwordChange}
                />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email:</Label>
              <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  placeholder="email"
                  value={user.email}
                  onChange={this.emailChange}
                />
            </FormGroup>
          </Form>
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

export default EditEmailModal;
