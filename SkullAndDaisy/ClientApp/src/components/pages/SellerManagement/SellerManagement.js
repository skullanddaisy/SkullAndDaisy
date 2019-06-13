import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import './SellerManagement.scss';
import orderRequests from '../../../helpers/data/orderRequests';
import formatPrice from '../../../helpers/formatPrice';

class SellerManagement extends React.Component {
  state = {
    userId: 0,
    completedOrders: [],
    totalSales: 0,
    monthlySales: 0,
  }

  getTotalSales = () => {
    const sellerOrders = this.state.completedOrders;
    let mySales = 0;
    sellerOrders.forEach((sellerOrder) => {
      mySales = sellerOrder.total + mySales;
    });
    this.setState({ totalSales: mySales });
  }

  getMonthly = () => {
    orderRequests.getMonthlySales(this.state.userId)
      .then((monthlySales) => {
        this.setState({ monthlySales });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        orderRequests.getSellerOrders(this.state.userId)
          .then((sellerOrders) => {
            const sales = [];
            sellerOrders.forEach((sellerOrder) => {
              if (sellerOrder.orderStatus === 'Complete') {
                sales.push(sellerOrder);
              }
            });
            this.setState({ completedOrders: sales });
            this.getTotalSales();
            this.getMonthly();
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className='seller-management'>
        <h1>Seller Mananagement</h1>

          <div className="card-body text-center mt-5">
            <h3 className="card-subtitle mb-2 text-muted">Seller Dashboard</h3>
            <p className="card-text">Sales this month: {formatPrice(this.state.totalSales)}</p>
            <p className="card-text">Total sales: {formatPrice(this.state.totalSales)}</p>
          </div>

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
