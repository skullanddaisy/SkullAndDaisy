import React from 'react';
import PropTypes from 'prop-types';
import './UserProfileCard.scss';
import CartHomeView from '../CartHomeView/CartHomeView';
import userRequests from '../../helpers/data/userRequests';

class UserProfileCard extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
    goToUserProfile: PropTypes.func,
  }

  state = {
    userFirstName: '',
  }

  componentDidMount() {
    userRequests.getSingleUser(this.props.userId).then((currentUser) => {
      const userFirstName = currentUser.firstName;
      this.setState({ userFirstName });
    }).catch((error) => {
      console.error(error);
    });
  }

  toUserProfileClickEvent = () => {
    this.props.goToProfile();
  }

  render() {
    const { userId } = this.props;
    const { userFirstName } = this.state;

    return (
      <div className='user-profile-card'>
        <div className='header' onClick={this.toUserProfileClickEvent}>
          <h2 className='ml-2'><i className="fas fa-user-circle"></i>  Hi {userFirstName}!</h2>
        </div>
        <CartHomeView userId={userId}/>
      </div>
    );
  }
}

export default UserProfileCard;
