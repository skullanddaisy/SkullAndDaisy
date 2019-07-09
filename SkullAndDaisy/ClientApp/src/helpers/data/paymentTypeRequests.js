import axios from 'axios';
import apiKeys from '../apiKeys';

const sadApiBaseUrl = apiKeys.sadApi.apiBaseUrl;

const getAllPaymentTypes = (userId) => new Promise((resolve, reject) => {
	axios.get(`${sadApiBaseUrl}/paymenttypes/${userId}/all`)
		.then((results) => {
			if (results != null) {
				const paymentTypes = results.data;
				resolve(paymentTypes);
			}
		})
		.catch((err) => {
			reject(err);
		});
});

const getAllActivePaymentTypes = (userId) => new Promise((resolve, reject) => {
	axios.get(`${sadApiBaseUrl}/paymenttypes/${userId}/all`)
		.then((results) => {
			if (results != null) {
				const paymentTypes = results.data;
				const activePaymentTypes = [];
				for(let i = 0; paymentTypes.length > i; i++) {
					if (paymentTypes[i].isActive) {
						activePaymentTypes.push(paymentTypes[i]);
					}
				}
				resolve(activePaymentTypes);
			} 
		})
	.catch((err) => {
		reject(err);
	});
})

const getSinglePaymentType = (paymentTypeId) => new Promise((resolve, reject) => {
	axios.get(`${sadApiBaseUrl}/paymenttypes/${paymentTypeId}`)
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

const addPaymentType = paymentType => axios.post(`${sadApiBaseUrl}/paymenttypes/create`, paymentType);

// const deletePaymentType = (paymentTypeId) => axios.put(`${sadApiBaseUrl}/paymenttypes/delete/${paymentTypeId}`);

const updatePaymentType = (paymentTypeId, newPaymentType) => axios.put(`${sadApiBaseUrl}/paymenttypes/update/${paymentTypeId}`, newPaymentType);

const getPaymentTypesByUserId = userId => axios.get(`${sadApiBaseUrl}/paymenttypes/${userId}/all`);

export default {
	getAllPaymentTypes,
	getSinglePaymentType,
	// deletePaymentType,
	updatePaymentType,
	getPaymentTypesByUserId,
	addPaymentType,
	getAllActivePaymentTypes
}
