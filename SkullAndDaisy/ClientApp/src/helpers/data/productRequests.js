import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getAllProducts = () => new Promise((resolve, reject) => {
  axios
    .get(`${sadApiBaseUrl}/products/GetAllProducts`)
    .then((results) => {
      const products = results.data;
      resolve(products);
    })
    .catch((err) => {
      reject(err);
    });
});

const getProductsByType = (productTypeId) => new Promise((resolve, reject) => {
  axios
    .get(`${sadApiBaseUrl}/products/FilterProductByType/${productTypeId}`)
    .then((results) => {
      const productsFilteredByType = results.data;
      console.log(productsFilteredByType);
      resolve(productsFilteredByType);
    })
    .catch((err) => {
      reject(err);
    });
  });

const getSellersProducts = sellerId => new Promise((resolve, reject) => {
  axios
    .get(`${sadApiBaseUrl}/products/FilterProductsByUser/${sellerId}`)
    .then((results) => {
      const sellersProducts = results.data;
      resolve(sellersProducts);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getAllProducts,
  getSellersProducts,
  getProductsByType
};
