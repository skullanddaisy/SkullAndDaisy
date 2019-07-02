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

const defaultPassword = {
  oldPassword: '',
  newPassword: '',
};

class EditPasswordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newPasswordDetails: defaultPassword,
      password: {
        oldPassword: '',
        newPassword: '',
      },
    };
    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempPassword = { ...this.state.newPasswordDetails };
    tempPassword[name] = e.target.value;
    this.setState({ newPasswordDetails: tempPassword });
  }

  oldPasswordChange = (e) => {
    const tempPassword = { ...this.state.password };
    tempPassword.oldPassword = e.target.value;
    this.setState({ password: tempPassword });
  };

  newPasswordChange = (e) => {
    const tempPassword = { ...this.state.password };
    tempPassword.newPassword = e.target.value;
    this.setState({ password: tempPassword });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  formSubmit = (e) => {
    const { changePassword } = this.props;
    const myPassword = { ...this.state.password };
    changePassword(myPassword.oldPassword, myPassword.newPassword);
    this.setState({ newPasswordDetails: defaultPassword });
  }

  render() {
    const { password } = this.state;
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Change your Password</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="inputOldPassword">Provide current password to continue</Label>
              <Input
                  type="password"
                  className="form-control"
                  id="inputOldPassword"
                  aria-describedby="passwordHelp"
                  value={password.oldPassword}
                  onChange={this.oldPasswordChange}
                />
            </FormGroup>
            <FormGroup>
              <Label for="inputNewPassword">New Password:</Label>
              <input
                  type="password"
                  className="form-control"
                  id="inputNewPassword"
                  aria-describedby="passwordHelp"
                  value={password.newPassword}
                  onChange={this.newPasswordChange}
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

export default EditPasswordModal;
