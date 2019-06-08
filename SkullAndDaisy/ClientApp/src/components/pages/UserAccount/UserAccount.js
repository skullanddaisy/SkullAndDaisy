import React from 'react';

import './UserAccount.scss';

class UserAccount extends React.Component {
    changeView = (e) => {
        const view = e.currentTarget.id;
        this.props.history.push(`/${view}`);
    }

    render() {
        return (
            <div className='user-account'>

                <h1>Account Management</h1>

                <div className="user-account-container mx-auto">

                    <div className="card-deck mt-5 row">

                        <div className="card border-dark am-tile" id="orders" onClick={this.changeView}>
                            <div className="card-body text-center">
                                <h4 className="card-title"><i className="fas fa-box-open fa-6x"></i></h4>
                                <h6 className="card-subtitle mb-2 text-muted">Orders</h6>
                                <p className="card-text">See your order data for your purchases</p>
                            </div>
                        </div>
                        <div className="card border-dark am-tile" id='sellermanagement' onClick={this.changeView}>
                            <div className="card-body text-center">
                                <h4 className="card-title"><i className="fas fa-hand-holding-usd fa-6x"></i></h4>
                                <h6 className="card-subtitle mb-2 text-muted">Seller Management</h6>
                                <p className="card-text">See order history, and manage product information</p>
                            </div>
                        </div>
                        <div className="card border-dark am-tile" id='paymenttypes' onClick={this.changeView}>
                            <div className="card-body text-center">
                                <h4 className="card-title"><i className="far fa-credit-card fa-6x"></i></h4>
                                <h6 className="card-subtitle mb-2 text-muted">Payment Methods</h6>
                                <p className="card-text">Manage your payment methods</p>
                            </div>
                        </div>
                        <div className="card border-dark am-tile" id='loginsettings' onClick={this.changeView}>
                            <div className="card-body text-center">
                                <h4 className="card-title"><i className="fas fa-user-circle fa-6x"></i></h4>
                                <h6 className="card-subtitle mb-2 text-muted">Login Settings</h6>
                                <p className="card-text">Change your username, password, etc</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default UserAccount;
