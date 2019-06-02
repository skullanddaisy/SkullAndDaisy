import React, { Component } from '../../node_modules/react';
import connection from '../helpers/data/connection'

class App extends Component {
  componentDidMount() {
    connection();
  }

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;