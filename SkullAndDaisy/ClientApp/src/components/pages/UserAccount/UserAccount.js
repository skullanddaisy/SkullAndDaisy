import React from 'react';
import OrderHistory from './OrderHistory/OrderHistory';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import LoginSettings from './LoginSettings/LoginSettings';

import './UserAccount.scss';

class UserAccount extends React.Component {
    render() {
        return (
            <div className='top-row'>
                <div className="your-orders">
                    <OrderHistory />
                </div>
                <div className="bottom-row">
                    <PaymentMethod />
                    <LoginSettings />
                </div>
            </div>
        );
    }
}

export default UserAccount;
