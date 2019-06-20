import axios from 'axios';
import authRequests from './authRequests';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const createUser = user => axios.post(`${sadApiBaseUrl}/users/register`, user);

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${sadApiBaseUrl}/users`)
    .then((result) => {
      if (result != null) {
        const allUsers = result.data;
        resolve(allUsers);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleUser = () => new Promise((resolve, reject) => {
  const userEmail = authRequests.getUserEmail();
  getAllUsers()
    .then((users) => {
      const currentUser = users.find(user => user.email === userEmail);
      resolve(currentUser);
    })
    .catch((error) => {
      reject(error);
    });
});

const getUserIdByEmail = () => new Promise((resolve, reject) => {
  const userEmail = authRequests.getUserEmail();
  getAllUsers()
    .then((users) => {
      const currentUser = users.filter(user => user.email === userEmail);
      const userId = currentUser[0].id;
      resolve(userId);
    }).catch((error) => {
      reject(error);
    });
});

const updateUser = (user, id) => axios.put(`${sadApiBaseUrl}/users/updateuser/${id}`, user);

export default {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserIdByEmail,
  updateUser,
};
