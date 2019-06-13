import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getPendingOrder = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/pending`);

const getCompletedOrders = userId => axios.get(`${sadApiBaseUrl}/orders/getMyOrdersByStatus/${userId}/complete`);

const getAllSellerOrders = sellerId => new Promise((resolve, reject) => {
  axios
    .get(`${sadApiBaseUrl}/orders/getordersbyproductseller/{sellerId}`)
    .then((results) => {
      const sellerOrders = results.data;
      resolve(sellerOrders);
    })
    .catch((err) => {
      reject(err);
    });
});

const getTotalCompletedSales = sellerId => new Promise((resolve, reject) => {
  axios
    .get(`${sadApiBaseUrl}/orders/getordersbyproductseller/{sellerId}/completed`)
    .then((results) => {
      let amountSold = 0;
      const allCompleted = results.data;
      for (let i = 0; i < allCompleted.length; i += 1) {
        amountSold = allCompleted[i].total + amountSold;
      }
      resolve(amountSold);
    })
    .catch((err) => {
      reject(err);
    });
});


export default {
  getPendingOrder,
  getCompletedOrders,
  getAllSellerOrders,
  getTotalCompletedSales,
};
