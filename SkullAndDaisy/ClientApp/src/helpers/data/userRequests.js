import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const createUser = user => axios.post(`${sadApiBaseUrl}/users/register`, user);

export default {
    createUser
};
