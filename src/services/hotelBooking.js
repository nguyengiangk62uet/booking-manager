import { requestServices } from './shared';

const getHotelBookings = (params) => {
  return requestServices.mainClient.get(
    '/hotel-bookings', { params }
  ).then(res => res.data);
};

const updateHotelBooking = (bookingId, params) => {
  return requestServices.mainClient.patch(
    `/hotel-bookings/${bookingId}`, params
  ).then(res => res.data);
};

export default {
  getHotelBookings,
  updateHotelBooking
}
