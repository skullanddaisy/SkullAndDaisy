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
import CustomerOrders from '../components/pages/CustomerOrders/CustomerOrders';
import SellerProducts from '../components/pages/SellerProducts/SellerProducts';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Potions from '../components/pages/ProductTypes/Potions/Potions';
import Poisons from '../components/pages/ProductTypes/Poisons/Poisons';
import Crystals from '../components/pages/ProductTypes/Crystals/Crystals';
import Herbs from '../components/pages/ProductTypes/Herbs/Herbs';
import ProductDetails from '../components/pages/ProductDetails/ProductDetails';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {... rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
        authRequests.getCurrentUserJwt();
      } else {
        this.setState({
          authed: false,
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

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClicky={logoutClicky}/>
              <Switch>
                <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                <PrivateRoute path='/useraccount' exact authed={this.state.authed} component={UserAccount} />
                <PrivateRoute path='/potions' exact authed={this.state.authed} component={Potions} />
                <PrivateRoute path='/poisons' exact authed={this.state.authed} component={Poisons} />
                <PrivateRoute path='/crystals' exact authed={this.state.authed} component={Crystals} />
                <PrivateRoute path='/herbs' exact authed={this.state.authed} component={Herbs} />
                <PrivateRoute path='/cart' exact component={Cart} authed={this.state.authed}/>
                <PrivateRoute path='/orders/' exact authed={this.state.authed} component={Orders} />
                <PrivateRoute path='/sellermanagement/' exact authed={this.state.authed} component={SellerManagement} />
                <PrivateRoute path='/paymenttypes/' exact authed={this.state.authed} component={PaymentTypes} />
                <PrivateRoute path='/loginsettings/' exact authed={this.state.authed} component={LoginSettings} />
                <PrivateRoute path='/customerorders/' exact authed={this.state.authed} component={CustomerOrders} />
                <PrivateRoute path='/sellerproducts/' exact authed={this.state.authed} component={SellerProducts} />
                <PrivateRoute path='/productdetails/:id' exact authed={this.state.authed} component={ProductDetails} />

                <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
