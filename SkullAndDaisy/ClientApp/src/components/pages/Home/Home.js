import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import UserProfileCard from '../../UserProfileCard/UserProfileCard';
import DealOfTheDayCard from '../../DealOfTheDayCard/DealOfTheDayCard';
import FeaturedListCard from '../../FeaturedListCard/FeaturedListCard';
import LatestProductsCard from '../../LatestProductsCard/LatestProductsCard';
import ProductTypesCard from '../../ProductTypesCard/ProductTypesCard';
import MyFooter from '../../MyFooter/MyFooter';
import './Home.scss';

class Home extends React.Component {
    state = {
      userId: 0,
    }

    goToProfile = () => {
      this.props.history.push('/useraccount');
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
      const { userId } = this.state;

      if (userId === 0) {
        return (
          <div><h1>Loading</h1></div>
        );
      }

      return (
            <div className='homeContainer'>
                <div className="homeUpper">
                    <UserProfileCard goToProfile={this.goToProfile} userId={userId}/>
                    <DealOfTheDayCard />
                </div>
                <div className="homeMiddle">
                    <div className="featuredListText">
                        <h1>Featured list</h1>
                    </div>
                    <FeaturedListCard />
                    <div className="latestProductsText">
                        <h1>Latest products</h1>
                    </div>
                    <LatestProductsCard />
                    <div className="productTypesText">
                        <h1>Product types</h1>
                    </div>
                    <ProductTypesCard />
                </div>
                <div>
                    <MyFooter />
                </div>
            </div>
      );
    }
}

export default Home;
