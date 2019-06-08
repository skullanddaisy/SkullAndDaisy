import React from 'react';
import UserProfileCard from '../../UserProfileCard/UserProfileCard';
import DealOfTheDayCard from '../../DealOfTheDayCard/DealOfTheDayCard';
import FeaturedListCard from '../../FeaturedListCard/FeaturedListCard';
import LatestProductsCard from '../../LatestProductsCard/LatestProductsCard';
import ProductTypesCard from '../../ProductTypesCard/ProductTypesCard';
import MyFooter from '../../MyFooter/MyFooter';
import './Home.scss';

class Home extends React.Component {
    goToProfile = () => {
        this.props.history.push('/useraccount')
    }

    render() {
        return (
            <div className='homeContainer'>
                <div className="homeUpper">
                    <UserProfileCard goToProfile={this.goToProfile} />
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