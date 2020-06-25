import { requestServices } from './shared';


const createHotel = (params) => {
  return requestServices.mainClient.post(
    '/hotels',
    params,
  ).then(res => res.data);
};

const getHotel = (hotelId) => {
  return requestServices.mainClient.get(
    `/hotels/${hotelId}`,
  ).then(res => res.data);
};

const getHotels = (params) => {
  return requestServices.mainClient.get(
    '/hotels', { params }
  ).then(res => res.data);
};

const updateHotel = (hotelId, params) => {
  return requestServices.mainClient.patch(
    `/hotels/${hotelId}`, params
  ).then(res => res.data);
};

const getAllPayment = (hotelId) => {
  return requestServices.mainClient.get(
    `/hotels/${hotelId}/payment/get-all`,
  ).then(res => res.data);
};

const deleteHotel = (hotelId) => {
  return requestServices.mainClient.delete(
    `/hotels/${hotelId}`,
  ).then(res => res.data);
}

export default {
  createHotel,
  getAllPayment,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
}
