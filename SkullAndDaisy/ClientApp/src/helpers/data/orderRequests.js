import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getPendingOrder = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/pending`);

const getCompletedOrders = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/complete`);

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
  getTotalSales,
};
