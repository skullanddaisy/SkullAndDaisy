import React from 'react';
import './Home.scss';
import MyNavbar from '../../MyNavbar/MyNavbar';

class Home extends React.Component {
    render() {
        return (
            <div className = 'Home'>
                <MyNavbar />
                <h1>You're in!!</h1>
            </div>
        );
    }
}

export default Home;