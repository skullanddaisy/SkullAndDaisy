import React, { Component } from '../../node_modules/react';
import connection from '../helpers/data/connection';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Auth from '../components/Auth/Auth';

class App extends Component {
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