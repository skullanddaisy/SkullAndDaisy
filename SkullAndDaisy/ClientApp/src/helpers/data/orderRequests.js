import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

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

export default getAllSellerOrders;
