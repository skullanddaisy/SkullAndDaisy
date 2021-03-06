import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getPendingOrder = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/pending`);

const getCompletedOrders = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/complete`);

const getShippedOrders = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/shipped`);

const updateOrder = orderObject => axios.put(`${sadApiBaseUrl}/orders/updateOrder`, orderObject);

const addOrder = orderObject => axios.post(`${sadApiBaseUrl}/orders/addorder`, orderObject);

const getAllMyOrders = userId => new Promise((resolve, reject) => {
  axios.get(`${sadApiBaseUrl}/orders/getallmyorders/${userId}`)
    .then((result) => {
      resolve(result.data);
    }).catch((error) => {
      reject(error);
    });
});

const getMonthlySales = userId => new Promise((resolve, reject) => {
  axios.get(`${sadApiBaseUrl}/orders/getmonthlysalestotal/${userId}`)
    .then((result) => {
      const monthlySales = result.data;
      resolve(monthlySales);
    })
    .catch((err) => {
      reject(err);
    });
});

const getUnshippedItems = userId => new Promise((resolve, reject) => {
  axios.get(`${sadApiBaseUrl}/orders/getunshipped/${userId}`)
    .then((result) => {
      const unshippedItems = result.data;
      resolve(unshippedItems);
    })
    .catch((err) => {
      reject(err);
    });
});

const getTotalSales = userId => new Promise((resolve, reject) => {
  axios.get(`${sadApiBaseUrl}/orders/gettotalsales/${userId}`)
    .then((result) => {
      const totalSales = result.data;
      resolve(totalSales);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSellerOrders = sellerId => new Promise((resolve, reject) => {
  axios.get(`${sadApiBaseUrl}/orders/getordersbyproductseller/${sellerId}`)
    .then((result) => {
      if (result != null) {
        const allOrders = result.data;
        resolve(allOrders);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getPendingOrder,
  getCompletedOrders,
  getSellerOrders,
  getMonthlySales,
  getShippedOrders,
  getAllMyOrders,
  getTotalSales,
  getUnshippedItems,
  updateOrder,
  addOrder,
};
