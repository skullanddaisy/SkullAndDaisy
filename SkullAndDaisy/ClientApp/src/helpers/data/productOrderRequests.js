import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getProductOrderByIds = (orderId, productId) => axios.get(`${sadApiBaseUrl}/productorders/getproductorderbyids/${orderId}/${productId}`);

const addProductOrder = productOrderObject => axios.post(`${sadApiBaseUrl}/productorders/addproductorder`, productOrderObject);

const updateProductOrder = productOrderObject => axios.put(`${sadApiBaseUrl}/productorders/updateproductorder`, productOrderObject);

const deleteProductOrder = productOrderId => axios.delete(`${sadApiBaseUrl}/productorders/deleteproductorder/${productOrderId}`);

export default {
  addProductOrder,
  getProductOrderByIds,
  updateProductOrder,
  deleteProductOrder,
};
