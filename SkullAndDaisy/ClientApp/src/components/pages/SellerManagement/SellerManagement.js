import React from 'react';
import { Button } from 'reactstrap';
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
    unshippedItems: [],
    totalSales: 0,
    monthlySales: 0,
    myInventory: [],
    isEditing: false,
    productToEdit: {},
    modal: false,
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

  getUnshippedItems = () => {
    orderRequests.getUnshippedItems(this.state.userId)
      .then((unshippedItems) => {
        this.setState({ unshippedItems });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  formSubmitEvent = (newProduct) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      productRequests.putRequest(editId, newProduct)
        .then(() => {
          this.getMyInventory();
          this.setState({ isEditing: false, editId: '-1' });
        })
        .catch(err => console.error('error with product post', err));
    } else {
      productRequests.addNew(newProduct)
        .then(() => {
          this.getMyInventory();
        })
        .catch(err => console.error('error in product post', err));
    }
  }

  editProductItem = (productId) => {
    productRequests.getSingleProduct(productId)
      .then((product) => {
        this.setState({ isEditing: true, productToEdit: product.data });
        this.showModal();
      })
      .catch(error => console.error('There was an error in getting a single product', error));
  }

  showModal = (e) => {
    this.setState({
      hidden: !this.state.hidden,
      modal: true,
    });
  };

  closeModal = () => {
    this.setState({
      hidden: !this.state.hidden,
      productToEdit: {},
      modal: false,
    });
  };

  passProductToEdit = productId => this.setState({ isEditing: true, editId: productId });

  deleteOne = (productId) => {
    productRequests.deleteProduct(productId)
      .then(() => {
        this.getMyInventory();
      })
      .catch(err => console.error('error in deleting', err));
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
            this.getUnshippedItems();
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  goToOrderHistory = (e) => {
    this.props.history.push('/sellermanagement/order/history');
  }

  render() {
    const {
      unshippedItems,
      myInventory,
      isEditing,
      editId,
      productToEdit,
      modal,
    } = this.state;

    return (
      <div className='seller-management'>
        <header className="dashboard-header">
            <h1 className="card-subtitle mb-4 ml-4 text-muted">Seller Dashboard</h1>
            <div>
            <Button color="secondary" onClick={this.goToOrderHistory}>See Order History</Button>
            </div>
            <div>
              <p className="card-text mr-4">Sales this month: {formatPrice(this.state.monthlySales)}</p>
              <p className="card-text mr-4 mb-1">Total sales: {formatPrice(this.state.totalSales)}</p>
            </div>
        </header>
        <div className="dashboard-middle mt-4">
          <OrdersTable unshippedItems={unshippedItems} />
          <InventoryTable
            myInventory={myInventory}
            onSubmit={this.formSubmitEvent}
            deleteSingleProduct={this.deleteOne}
            productToEdit={productToEdit}
            isEditing={isEditing}
            editId={editId}
            editForm={this.editProductItem}
            modal={modal}
            showModal={this.showModal}
            closeModal={this.closeModal}
          />
        </div>
      </div>
    );
  }
}

export default SellerManagement;
