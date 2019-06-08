import axios from 'axios';
import authRequests from './authRequests';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const createUser = user => axios.post(`${sadApiBaseUrl}/users/register`, user);

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.getAllUsers(`$${sadApiBaseUrl}/users`)
    .then((result) => {
      const allUsersObject = result.data;
      const allUsersArray = [];
      if (allUsersObject !== null) {
        allUsersObject.forEach((user) => {
          allUsersArray.push(user);
        });
      }
      resolve(allUsersArray);
    })
    .catch((err) => {
      reject(err);
    });
});


const getUserIdByEmail = () => {
  const userEmail = authRequests.getUserEmail();
  getAllUsers()
    .then((users) => {
      const currentUser = users.filter(user => user.Email === userEmail);
      return currentUser.Id;
    }).catch((error) => {
      console.error('did not find user', error);
    });
};

export default {
  createUser,
  getAllUsers,
  getUserIdByEmail,
};
