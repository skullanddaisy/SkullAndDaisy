import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getAllPaymentTypes = (userId) => new Promise((resolve, reject) => {
	axios.get(`${sadApiBaseUrl}/paymenttypes/${userId}/all`)
		.then((results) => {
			if ( results != null) {
				const paymentTypes = results.data;
				resolve(paymentTypes);
			}
		})
		.catch((err) => {
			reject(err);
		});
});

const getSinglePaymentType = (userId) => new Promise((resolve, reject) => {
	axios.get(`${sadApiBaseUrl}/paymenttypes/${userId}`)
		.then((result) => {
			if (result != null) {
				const paymentType = result.data;
				resolve(paymentType);
			}
		})
		.catch((err) => {
			reject(err);
		})
})

const deletePaymentType = (paymentTypeId) => axios.put(`${sadApiBaseUrl}/paymenttypes/delete/${paymentTypeId}`);

const updatePaymentType = (paymentTypeId) => axios.put(`${sadApiBaseUrl}/paymenttypes/update${paymentTypeId}`);


export default {
	getAllPaymentTypes,
	getSinglePaymentType,
	deletePaymentType,
	updatePaymentType
};