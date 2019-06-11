import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import './LoginSettings.scss';

class LoginSettings extends React.Component {
  state = {
    userId: 0,
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
      }).catch((error) => {
        console.error(error);
      });
  }


  render() {
    return (
      <div className='login-settings'>
        <h2>Login Settings</h2>
      </div>
    );
  }
}

export default LoginSettings;
