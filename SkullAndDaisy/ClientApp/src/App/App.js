import React, { Component } from '../../node_modules/react';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';

class App extends Component {
  componentDidMount() {
    connection();
  }

  render() {
    return (
      <div className="Auth">
        <Auth />
      </div>
    );
  }
}

export default App;