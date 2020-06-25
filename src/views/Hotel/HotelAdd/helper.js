export const rules = {
  name: [{required: true, message: 'Vui lòng nhập tên'}],
  description: [{required: true, message: 'Vui lòng nhập mô tả'}],
  cityOrProvince: [{required: true, message: 'Vui lòng chọn tỉnh / thành'}],
  address: [{required: true, message: 'Vui lòng nhập địa chỉ chi tiết'}],
  longitude: [{required: true, message: 'Vui lòng nhập kink độ'}],
  latitude: [{required: true, message: 'Vui lòng nhập vĩ độ'}],
  checkin: [{required: true, message: 'Vui lòng nhập thời gian checkin'}],
  checkout: [{required: true, message: 'Vui lòng nhập thời gian checkout'}],
  utilities: [{required: true, message: 'Vui lòng chọn một vài dịch vụ'}],
  phoneNumber: [{required: true, message: 'Vui lòng nhập SĐT'}],
  email: [{required: true, message: 'Vui lòng nhập email'}],
  roomTypes: [{required: true, message: 'Vui lòng chọn các loại phòng'}],
  images: [
    {required: true, message: 'Vui lòng tải lên ít nhất một ảnh'}
  ]
};
