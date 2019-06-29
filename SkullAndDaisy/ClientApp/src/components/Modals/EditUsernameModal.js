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
} from 'reactstrap';

const defaultUser = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  id: 0,
};

class EditUsernameModal extends React.Component {
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

  formSubmit = (e) => {
    const { onSubmit } = this.props;
    const myUser = { ...this.state.newUser };
    const userId = this.props.currentUser.id;
    onSubmit(myUser, userId);
    this.setState({ newUser: defaultUser });
  }

  render() {
    const { newUser } = this.state;
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Change your username</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleUsername">New username</Label>
              <input
                  type="text"
                  className="form-control"
                  id="username"
                  aria-describedby="usernameHelp"
                  value={newUser.username}
                  onChange={this.usernameChange}
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

export default EditUsernameModal;
