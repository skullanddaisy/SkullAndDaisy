import React from 'react';
import UserProfileCard from '../../UserProfileCard/UserProfileCard';
import DealOfTheDayCard from '../../DealOfTheDayCard/DealOfTheDayCard';
import FeaturedListCard from '../../FeaturedListCard/FeaturedListCard';
import LatestProductsCard from '../../LatestProductsCard/LatestProductsCard';
import ProductTypesCard from '../../ProductTypesCard/ProductTypesCard';

import './Home.scss';

class Home extends React.Component {
    render() {
        return (
            <div className = 'Home'>
                <div className="upper">
                    <UserProfileCard />
                    <DealOfTheDayCard />
                </div>
                <div className="middle">
                    <FeaturedListCard />
                    <LatestProductsCard />
                    <ProductTypesCard />
                </div>
            </div>
        );
    }
}

export default Home;