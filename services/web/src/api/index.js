import { axiosWithAuth } from './axiosWithAuth';

// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}/profiles`;

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

export const updateRequest = (requestId, updatedRequestValues) => {
  console.log(
    'updatedRequestValues: (src/api/index.js) ',
    updatedRequestValues
  );
  return axiosWithAuth()
    .put(`/requests/${requestId}`, updatedRequestValues)
    .then(response => response.data);
};
