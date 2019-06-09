import React from 'react';
import './SellerManagement.scss';

class SellerManagement extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className='seller-management'>
        <h1>Seller Mananagement</h1>

        <div className="seller-management-container mx-auto">
          <div className="card-deck mt-5 row">
            <div className="card border-dark sm-tile" id="customerorders" onClick={this.changeView}>
              <div className="card-body text-center">
                <h4 className="card-title"><i className="fas fa-boxes fa-6x"></i></h4>
                <h6 className="card-subtitle mb-2 text-muted">Customer Orders</h6>
                <p className="card-text">See your individual sales</p>
              </div>
            </div>
            <div className="card border-dark sm-tile" id='sellerproducts' onClick={this.changeView}>
              <div className="card-body text-center">
                <h4 className="card-title"><i className="fas fa-barcode fa-6x"></i></h4>
                <h6 className="card-subtitle mb-2 text-muted">Product Management</h6>
                <p className="card-text">Manage your products information</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SellerManagement;
