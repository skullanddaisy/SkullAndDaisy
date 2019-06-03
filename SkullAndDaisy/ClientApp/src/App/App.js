import React, { Component } from '../../node_modules/react';
import {Route, BroswerRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';

import connection from '../helpers/data/connection';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import fbConnection from '../helpers/data/authRequests';
fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  const routeChecker = props => (authed == false
    ? (<Component { ...props } {... rest} />)
    : (<Redirect to={{ pathname: '/register', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
  }

  render() {
    return (
      <div className="Auth">
        <MyNavbar />
        <Auth />
      </div>
    );
  }
}

export default App;