import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './UserProfileCard.scss';
import Cart from '../pages/Cart/Cart';

class UserProfileCard extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
  }

  toUserProfileClickEvent = () => {
    this.props.goToProfile();
  }

  render() {
    const { userId } = this.props;
    return (
      <div className='user-profile-card'>
        <h2>User Profile Component</h2>
        <Button
          color="primary"
          onClick={this.toUserProfileClickEvent}>To User Profile</Button>
        <Cart userId= {userId}/>
      </div>
    );
  }
}

export default UserProfileCard;
