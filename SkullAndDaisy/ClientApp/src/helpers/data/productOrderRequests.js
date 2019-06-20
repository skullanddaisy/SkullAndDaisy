import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const addProductOrder = productOrderObject => axios.post(`${sadApiBaseUrl}/productorders/addproductorder`, productOrderObject);

export default {
  addProductOrder,
};
