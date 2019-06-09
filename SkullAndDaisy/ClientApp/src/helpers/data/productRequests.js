import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getAllProducts = () => new Promise((resolve, reject) => {
  axios
    .get(`${sadApiBaseUrl}products/GetAllProducts`)
    .then((result) => {
      const products = result.data;
      resolve(products);
    })
    .catch((err) => {
      reject(err);
    });
});

export default getAllProducts;
