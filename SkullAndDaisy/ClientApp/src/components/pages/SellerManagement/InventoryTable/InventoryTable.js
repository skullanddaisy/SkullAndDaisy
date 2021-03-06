import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import productShape from '../../../../helpers/props/productShape';
import ProductTableItem from '../ProductTableItem/ProductTableItem';
import InventoryModal from '../InventoryModal/InventoryModal';
import './InventoryTable.scss';

export default class InventoryTable extends Component {
  static propTypes = {
    myInventory: PropTypes.arrayOf(productShape),
    onSubmit: PropTypes.func,
    deleteSingleProduct: PropTypes.func,
    passProductToEdit: PropTypes.func,
  }

  render() {
    const {
      myInventory,
      deleteSingleProduct,
      productToEdit,
      editForm,
      modal,
      isEditing,
      closeModal,
    } = this.props;

    const productTableComponents = myInventory.map(product => (
      <ProductTableItem
        product={product}
        key={product.id}
        deleteSingleProduct={deleteSingleProduct}
        productToEdit={productToEdit}
        editForm={editForm}
      />
    ));

    return (
      <div className="col ml-2 mr-2 mt-5">
        <div className="row d-flex justify-content-center mb-4">
          <h2 className="mr-5 table-contents">Inventory</h2>
          <InventoryModal
            buttonLabel="Add"
            onSubmit={this.props.onSubmit}
            productToEdit={productToEdit}
            isEditing={isEditing}
            modal={modal}
            closeModal={closeModal} />
        </div>
        <Table className="table-contents">
          <thead>
            <tr>
              <th></th>
              <th>Qty</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {productTableComponents}
          </tbody>
        </Table>
      </div>
    );
  }
}
