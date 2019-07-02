import firebase from 'firebase';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
}, (err) => {
    return Promise.reject(err);
});

axios.interceptors.response.use((response) => response, (errorResponse) => {
  console.error('Blew up');
});

const registerUser = (user) => firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

const loginUser = (user) => firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
        getCurrentUserJwt();
    });

const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

const getUserEmail = () => firebase.auth().currentUser.email;


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
