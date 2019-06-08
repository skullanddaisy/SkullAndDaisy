import React, { Component } from '../../node_modules/react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Route, 
  BrowserRouter, 
  Redirect, 
  Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import authRequests from '../helpers/data/authRequests';
import connection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import UserAccount from '../components/pages/UserAccount/UserAccount';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest}) => {
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

class App extends Component {
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
    const {authed} = this.state;
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
                <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
