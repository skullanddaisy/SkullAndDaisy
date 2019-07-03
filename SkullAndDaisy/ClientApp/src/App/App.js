import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Route,
  BrowserRouter,
  Redirect,
  Switch,
} from 'react-router-dom';
import React from '../../node_modules/react';

import 'bootstrap/dist/css/bootstrap.min.css';

import authRequests from '../helpers/data/authRequests';
import connection from '../helpers/data/connection';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Cart from '../components/pages/Cart/Cart';
import UserAccount from '../components/pages/UserAccount/UserAccount';
import Orders from '../components/pages/Orders/Orders';
import SellerManagement from '../components/pages/SellerManagement/SellerManagement';
import PaymentTypes from '../components/pages/PaymentTypes/PaymentTypes';
import LoginSettings from '../components/pages/LoginSettings/LoginSettings';
import SellerProducts from '../components/pages/SellerProducts/SellerProducts';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Potions from '../components/pages/ProductTypes/Potions/Potions';
import Poisons from '../components/pages/ProductTypes/Poisons/Poisons';
import Crystals from '../components/pages/ProductTypes/Crystals/Crystals';
import Herbs from '../components/pages/ProductTypes/Herbs/Herbs';
import ProductDetails from '../components/pages/ProductDetails/ProductDetails';
import SellerOrderHistory from '../components/pages/SellerOrderHistory/SellerOrderHistory';
import SellerStore from '../components/pages/SellerStore/SellerStore';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {... rest} key={props.location.pathname}/>)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props } key={props.location.pathname} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
        authRequests.getCurrentUserJwt();
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount = () => {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const logoutClicky = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (this.state.pendingUser) {
      return null;
    }
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClicky={logoutClicky}/>
              <Switch>
                <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                <PrivateRoute path='/useraccount' component={UserAccount} authed={this.state.authed} />
                <PrivateRoute path='/potions' component={Potions} authed={this.state.authed} />
                <PrivateRoute path='/poisons' component={Poisons} authed={this.state.authed} />
                <PrivateRoute path='/crystals' component={Crystals} authed={this.state.authed} />
                <PrivateRoute path='/herbs' component={Herbs} authed={this.state.authed} />
                <PrivateRoute path='/cart' component={Cart} authed={this.state.authed} />
                <PrivateRoute path='/orders/' component={Orders} authed={this.state.authed} />
                <PrivateRoute path='/sellermanagement/' component={SellerManagement} authed={this.state.authed} />
                <PrivateRoute path='/paymenttypes/' component={PaymentTypes} authed={this.state.authed} />
                <PrivateRoute path='/loginsettings/' component={LoginSettings} authed={this.state.authed} />
                <PrivateRoute path='/sellerproducts/' component={SellerProducts} authed={this.state.authed} />
                <PrivateRoute path='/productdetails/:id' component={ProductDetails} authed={this.state.authed} />
                <PrivateRoute path='/sellerstore/:id' component={SellerStore} authed={this.state.authed} />
                <PrivateRoute path='/order/history/seller' exact authed={this.state.authed} component={SellerOrderHistory} />
                <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
