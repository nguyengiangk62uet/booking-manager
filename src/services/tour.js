import { requestServices } from './shared';


const createTour = (params) => {
  return requestServices.mainClient.post(
    '/tours',
    params,
  ).then(res => res.data);
};

const getTour = (tourId) => {
  return requestServices.mainClient.get(
    `/tours/${tourId}`,
  ).then(res => res.data);
};

const getTours = (params) => {
  return requestServices.mainClient.get(
    '/tours', { params }
  ).then(res => res.data);
};

const updateTour = (tourId, params) => {
  return requestServices.mainClient.patch(
    `/tours/${tourId}`, params
  ).then(res => res.data);
};

const getAllPayment = (tourId) => {
  return requestServices.mainClient.get(
    `/tours/${tourId}/payment/get-all`,
  ).then(res => res.data);
};

const deleteTour = (tourId) => {
  return requestServices.mainClient.delete(
    `/tours/${tourId}`,
  ).then(res => res.data);
}

export default {
  createTour,
  getTour,
  getTours,
  updateTour,
  getAllPayment,
  deleteTour,
}
