import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import UserProfileCard from '../../UserProfileCard/UserProfileCard';
import DealOfTheDayCard from '../../DealOfTheDayCard/DealOfTheDayCard';
import FeaturedListCard from '../../FeaturedListCard/FeaturedListCard';
import LatestProductsCard from '../../LatestProductsCard/LatestProductsCard';
import MyFooter from '../../MyFooter/MyFooter';
import amethyst from '../../../img/amethyst_crystal.jpg';
import herbs from '../../../img/herbs_1.jpeg';
import poison from '../../../img/poison.jpeg';
import potions from '../../../img/potions.png';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
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
                    <CarouselProvider
                      id="theSlider"
                      naturalSlideWidth={100}
                      naturalSlideHeight={125}
                      totalSlides={4}
                    >
                      <Slider>
                        <Slide className="slideClass" index={0}><img className="featuredPics" src={amethyst} alt="amethyst" /></Slide>
                        <Slide className="slideClass" index={1}><img className="featuredPics" src={potions} alt="potions" /></Slide>
                        <Slide className="slideClass" index={2}><img className="featuredPics" src={poison} alt="poison" /></Slide>
                        <Slide className="slideClass" index={3}><img className="featuredPics" src={herbs} alt="herbs" /></Slide>
                      </Slider>
                      <ButtonBack>Back</ButtonBack>
                      <ButtonNext>Next</ButtonNext>
                    </CarouselProvider>
                    {/* <FeaturedListCard /> */}
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
