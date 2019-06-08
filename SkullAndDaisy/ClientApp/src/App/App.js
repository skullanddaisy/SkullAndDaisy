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
import MyNavbar from '../components/MyNavbar/MyNavbar';
import './App.scss';
import userRequests from '../helpers/data/userRequests';

const PublicRoute = ({
  component: Component,
  authed,
  uid,
  ...rest
}) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {... rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({
  component: Component,
  authed,
  uid,
  ...rest
}) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    uid: '',
  }

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = userRequests.getUserIdByEmail();
        this.setState({
          authed: true,
          uid: userId,
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
                <PrivateRoute path='/' exact component={Home} authed={this.state.authed} uid={this.state.uid}/>
                <PrivateRoute path='/cart' exact component={Cart} authed={this.state.authed} uid={this.state.uid}/>
                <PrivateRoute path='/home' component={Home} authed={this.state.authed} uid={this.state.uid}/>
                <PrivateRoute path='/useraccount' exact authed={this.state.authed} component={UserAccount} uid={this.state.uid}/>
                <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
