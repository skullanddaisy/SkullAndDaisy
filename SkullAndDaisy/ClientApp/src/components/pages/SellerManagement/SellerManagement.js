import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import OrdersTable from '../../OrdersTable/OrdersTable';
import InventoryTable from '../../InventoryTable/InventoryTable';
import './SellerManagement.scss';
import orderRequests from '../../../helpers/data/orderRequests';
import formatPrice from '../../../helpers/formatPrice';
import productRequests from '../../../helpers/data/productRequests';

class SellerManagement extends React.Component {
  state = {
    userId: 0,
    completedOrders: [],
    unshippedOrders: [],
    totalSales: 0,
    monthlySales: 0,
    myInventory: [],
  }

  getTotalSales = () => {
    orderRequests.getTotalSales(this.state.userId)
      .then((totalSales) => {
        this.setState({ totalSales });
      })
      .catch((error) => {
        console.error(error);
      });
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

  getMyInventory = () => {
    productRequests.getSellersProducts(this.state.userId)
      .then((myInventory) => {
        this.setState({ myInventory });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUnshippedOrders = () => {
    const unshippedOrders = [];
    const { completedOrders } = this.state;
    completedOrders.forEach((order) => {
      if (order.orderStatus !== 'Shipped') {
        unshippedOrders.push(order);
      }
      this.setState({ unshippedOrders });
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
              if (sellerOrder.orderStatus !== 'Pending') {
                sales.push(sellerOrder);
              }
            });
            this.setState({ completedOrders: sales });
            this.getTotalSales();
            this.getMonthly();
            this.getMyInventory();
            this.getUnshippedOrders();
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
    const { unshippedOrders, myInventory } = this.state;
    return (
      <div className='seller-management'>
        <header className="dashboard-header">
            <h1 className="card-subtitle mb-4 ml-4 text-muted">Seller Dashboard</h1>
            <div>
              <p className="card-text mr-4">Sales this month: {formatPrice(this.state.monthlySales)}</p>
              <p className="card-text mr-4 mb-1">Total sales: {formatPrice(this.state.totalSales)}</p>
            </div>
        </header>
        <div className="dashboard-middle mt-4">
          <OrdersTable unshippedOrders={unshippedOrders} />
          <InventoryTable myInventory={myInventory} />
        </div>
      </div>
    );
  }
}

export default SellerManagement;
