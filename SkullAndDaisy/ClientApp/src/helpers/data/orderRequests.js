import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getPendingOrder = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/pending`);

const getCompletedOrders = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/complete`);

export default {
  getPendingOrder,
  getCompletedOrders,
};
