import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import userRequests from '../../../helpers/data/userRequests';
import orderRequests from '../../../helpers/data/orderRequests';
import UserProfileCard from './UserProfileCard/UserProfileCard';
import DealOfTheDayCard from './DealOfTheDayCard/DealOfTheDayCard';
import LatestProductsCard from './LatestProductsCard/LatestProductsCard';
import MyFooter from '../../MyFooter/MyFooter';
import amethyst from '../../../img/amethyst_crystal.jpg';
import herbs from '../../../img/herbs_1.jpeg';
import potions from '../../../img/potions.png';
import poison from '../../../img/poisonCarousel.jpg';
import './Home.scss';


const defaultPendingOrder = {
  id: 0,
  orderDate: '',
  orderStatus: '',
  paymentTypeId: null,
  total: 0.00,
  userId: 0,
  products: [],
};

class Home extends React.Component {
    state = {
      userId: 0,
      pendingOrder: defaultPendingOrder,
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
          orderRequests.getPendingOrder(userId)
            .then((result) => {
              if (result.data.length === 0) {
                this.createNewPendingOrder();
              } else {
                const pendingOrder = result.data;
                this.setState({ pendingOrder });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }).catch((error) => {
          console.error(error);
        });
    }

    createNewPendingOrder = () => {
      const { pendingOrder, userId } = this.state;
      const newPendingOrder = { ...pendingOrder };
      newPendingOrder.orderstatus = 'Pending';
      newPendingOrder.total = 0.00;
      newPendingOrder.orderDate = new Date();
      newPendingOrder.userId = userId;
      orderRequests.addOrder(newPendingOrder)
        .then((result) => {
          this.setState({ pendingOrder: result.data });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    render() {
      const { pendingOrder, userId } = this.state;
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

      if (pendingOrder.orderStatus === '') {
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
