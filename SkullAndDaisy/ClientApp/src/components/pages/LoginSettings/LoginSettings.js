import React from 'react';
import firebase from 'firebase';
import EditUserNameModal from '../../Modals/EditUsernameModal';
import EditFirstAndLastNameModal from '../../Modals/EditFirstAndLastNameModal';
import EditEmailModal from '../../Modals/EditEmailModal';
import EditPasswordModal from '../../Modals/EditPasswordModal';
import userRequests from '../../../helpers/data/userRequests';
import './LoginSettings.scss';

class LoginSettings extends React.Component {
  state = {
    userId: 0,
    currentUser: {},
  }

  getUserId = () => {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
      }).catch((error) => {
        console.error(error);
      });
  }

  getCurrentUser = (userId) => {
    userRequests.getSingleUser(userId)
      .then((currentUser) => {
        this.setState({ currentUser });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  reauthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  }

  changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword).then(() => {
      const user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        console.log('Password updated!');
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }

  changeEmail = (currentPassword, newEmail) => {
    this.reauthenticate(currentPassword).then(() => {
      const user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
        console.log('Email updated!');
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }

  formSubmitEvent = (newUser, userId) => {
    userRequests.updateUser(newUser, userId)
      .then(() => {
        this.getCurrentUser(this.state.userId);
      });
  }

  componentDidMount() {
    this.getUserId();
    this.getCurrentUser(this.state.userId);
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className='login-settings'>
        <h1>Login Settings</h1>
        <div class="card tborder-dark mb-3 profile-card mt-4">
          <div class="card-body card-header p-3 d-flex justify-content-between">
            <div class="d-flex flex-column text-left">
              <p class="card-title font-weight-bold">Username:</p>
              <p>{currentUser.username}</p>
            </div>
            <div class="m-3 ml-5">
              <EditUserNameModal
                buttonLabel='Edit'
                currentUser={currentUser}
                onSubmit={this.formSubmitEvent}
              />
            </div>
          </div>

          <div class="card-body card-header p-3 d-flex justify-content-between">
            <div class="d-flex flex-column text-left">
              <p class="card-title font-weight-bold">Name:</p>
              <p>{currentUser.firstName} {currentUser.lastName}</p>
            </div>
            <div class="m-3 ml-5">
            <EditFirstAndLastNameModal
                buttonLabel='Edit'
                currentUser={currentUser}
                onSubmit={this.formSubmitEvent}
              />
            </div>
          </div>

          <div class="card-body card-header p-3 d-flex justify-content-between">
            <div class="d-flex flex-column text-left">
              <p class="card-title font-weight-bold">Email:</p>
              <p>{currentUser.email}</p>
            </div>
            <div class="m-3 ml-5">
            <EditEmailModal
                buttonLabel='Edit'
                currentUser={currentUser}
                changeEmail={this.changeEmail}
                reauthenticate={this.reauthenticate}
                onSubmit={this.formSubmitEvent}
              />
            </div>
          </div>

          <div class="card-body card-header p-3 d-flex justify-content-between">
            <div class="d-flex flex-column text-left">
              <p class="card-title font-weight-bold">Password:</p>
              <p>********</p>
            </div>
            <div class="m-3 ml-5">
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default LoginSettings;
