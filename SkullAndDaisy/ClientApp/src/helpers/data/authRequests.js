﻿/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import firebase from 'firebase';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, function (err) {
  return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
  return response;
}, errorResponse => {
  console.error('Blew up');
});

const registerUser = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

const loginUser = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
    getCurrentUserJwt();
  });
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

const getUserEmail = () => {
  return firebase.auth().currentUser.email;
};

const getCurrentUserJwt = () => firebase
  .auth()
  .currentUser.getIdToken()
  .then(token => sessionStorage.setItem('token', token));

export default {
  getUid,
  getUserEmail,
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUserJwt,
};
