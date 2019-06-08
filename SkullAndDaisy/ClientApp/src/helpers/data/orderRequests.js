import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getPendingOrder = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/pending`);

const getCompltedOrders = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/complete`);

export default {
  getPendingOrder,
  getCompltedOrders,
};
