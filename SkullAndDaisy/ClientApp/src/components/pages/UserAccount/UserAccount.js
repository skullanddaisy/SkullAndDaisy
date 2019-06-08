import React from 'react';
import OrderHistory from './OrderHistory/OrderHistory';
import SalesHistory from './SalesHistory/SalesHistory';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import LoginSettings from './LoginSettings/LoginSettings';

import './UserAccount.scss';

class UserAccount extends React.Component {
    render() {
        return (
            <div className='user-account'>
                <h1>Account Management</h1>

                <div className="user-account-container mt-5">

                    <div className="user-account-section">
                        <div className="user-account-sub-section">
                            <OrderHistory />
                        </div>

                        <div className="user-account-sub-section">
                            <SalesHistory />
                        </div>
                    </div>

                    <div className="user-account-section">
                        <div className="user-account-sub-section">
                            <PaymentMethod />
                        </div>
                        <div className="user-account-sub-section">
                            <LoginSettings />
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

export default UserAccount;
