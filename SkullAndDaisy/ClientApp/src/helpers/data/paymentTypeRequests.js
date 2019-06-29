import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getPaymentTypesByUserId = userId => axios.get(`${sadApiBaseUrl}/paymenttypes/${userId}/all`);

export default {
  getPaymentTypesByUserId,
};
