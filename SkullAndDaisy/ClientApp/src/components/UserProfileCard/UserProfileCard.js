import React from 'react';
import { Button } from 'reactstrap';
import './UserProfileCard.scss';

class UserProfileCard extends React.Component {
  toUserProfileClickEvent = () => {
    this.props.goToProfile();
  }

  render() {
    return (
      <div className='user-profile-card'>
        <h2>User Profile Component</h2>
        <Button
          color="primary"
          onClick={this.toUserProfileClickEvent}>To User Profile</Button>
      </div>
    );
  }
}

export default UserProfileCard;
