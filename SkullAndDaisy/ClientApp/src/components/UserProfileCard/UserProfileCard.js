import React from 'react';
import PropTypes from 'prop-types';
import './UserProfileCard.scss';
import CartHomeView from '../CartHomeView/CartHomeView';

class UserProfileCard extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
    goToUserProfile: PropTypes.func,
  }

  toUserProfileClickEvent = () => {
    this.props.goToProfile();
  }

  render() {
    const { userId } = this.props;
    return (
      <div className='user-profile-card'>
        <h2>User Profile Component</h2>
        <CartHomeView userId= {userId}/>
      </div>
    );
  }
}

export default UserProfileCard;
