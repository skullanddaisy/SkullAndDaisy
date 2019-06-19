import React from 'react';
import LoginSettingsModal from '../../LoginSettingsModal/LoginSettingsModal';
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

  componentDidMount() {
    this.getUserId();
    this.getCurrentUser(this.state.userId);
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className='login-settings'>
        <h1>Login Settings</h1>
        <div class="card text-white bg-dark profile-card mt-4">
          <div class="card-body">
            <h4 class="card-title">Username: {currentUser.username}</h4>
            <h5 class="card-title">First Name: {currentUser.firstName}</h5>
            <h5 class="card-title">Last Name: {currentUser.lastName}</h5>
            <p class="card-text">Email: {currentUser.email}</p>
            <LoginSettingsModal />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSettings;
