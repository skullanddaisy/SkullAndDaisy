import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import userRequests from '../../../helpers/data/userRequests';
import UserProfileCard from './UserProfileCard/UserProfileCard';
import DealOfTheDayCard from './DealOfTheDayCard/DealOfTheDayCard';
import LatestProductsCard from './LatestProductsCard/LatestProductsCard';
import MyFooter from '../../MyFooter/MyFooter';
import amethyst from '../../../img/amethyst_crystal.jpg';
import herbs from '../../../img/herbs_1.jpeg';
import potions from '../../../img/potions.png';
import poison from '../../../img/poisonCarousel.jpg';
import './Home.scss';

class Home extends React.Component {
    state = {
      userId: 0,
    }

    goToProfile = () => {
      this.props.history.push('/useraccount');
    }

    goToCart = () => {
      this.props.history.push('/cart');
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
      const Decorators = [{
        render() {
          return (
              <button
                onClick={this.props.previousSlide}>
                Previous Slide
              </button>
          );
        },
        position: 'CenterLeft',
        style: {
          padding: 20,
        },
      }];

      if (userId === 0) {
        return (
          <div><h1>Loading</h1></div>
        );
      }

      return (
            <div className='homeContainer'>
                <div className="homeUpper">
                    <UserProfileCard
                      goToProfile={this.goToProfile}
                      goToCart={this.goToCart}
                      userId={userId}
                    />
                    <DealOfTheDayCard />
                </div>
                <div className="homeMiddle">
                    <div className="featuredListText">
                        <h1>Featured list</h1>
                    </div>
                    <Carousel slidesToShow={4} slidesToScroll={1} height={400} slideWidth={5} cellAlign="center" dragging={true} Decorators={Decorators}>
                      <Link to='/crystals'>
                        <img className="featuredPics" src={amethyst} alt="amethyst" />
                      </Link>

                      <Link to='/potions'>
                        <img className="featuredPics" src={potions} alt="potions" />
                      </Link>

                      <Link to='/poisons'>
                        <img className="featuredPics" src={poison} alt="poison" />
                      </Link>

                      <Link to='/herbs'>
                        <img className="featuredPics" src={herbs} alt="herbs" />
                      </Link>
                    </Carousel>
                    <div className="latestProductsText">
                        <h1>Latest products</h1>
                    </div>
                    <LatestProductsCard />
                </div>
                <div>
                    <MyFooter />
                </div>
            </div>
      );
    }
}

export default Home;
