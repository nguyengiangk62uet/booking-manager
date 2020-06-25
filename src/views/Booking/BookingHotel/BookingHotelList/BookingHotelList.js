import React from 'react';
import { browserHistory, objectHelpers } from '../../../../helpers';
import { useBookingHotelsData} from '../../../../hooks/booking';
import { Card, notification, Table } from 'antd';
import { renderColumnsHotelBookings } from './helper';
import { hotelBookingService } from '../../../../services';
import BookingHotelFilter from './BookingHotelFilter';

const { getObjFromQueryString } = objectHelpers;

const BookingHotelList = () => {
  const { location } = browserHistory;
  const defaultParams = location.search
    ? getObjFromQueryString(location.search)
    : { page: 1, pageSize: 10 };

  const {
    bookings,
    pagination,
    handleTableChange,
    queryParams,
    setQueryParams,
    fetchingBooking,
  } = useBookingHotelsData(defaultParams);

  const onChangeStatus = (bookingId, newStatus) => {
    hotelBookingService.updateHotelBooking(bookingId, { status: newStatus })
      .then(() => {
        notification.success({
          message: 'Thay đổi trạng thái thành công',
        });
        const newQueryParams = { ...queryParams };
        setQueryParams(newQueryParams)
      });
  };

  return (
    <div className="seller-block">
      <Card
        title="Tìm kiếm đặt phòng"
        bodyStyle={{
          padding: 0,
        }}
      >
        <BookingHotelFilter queryParams={queryParams} setQueryParams={setQueryParams} />
      </Card>
      <Card
        className="mt-3"
        title="Danh sách đặt phòng"
        extra={
          <span className="total">
            Tổng số đơn đặt phòng: {pagination.total || 0}
          </span>
        }
        bodyStyle={{
          padding: '1rem',
        }}
      >
        <Table
          bordered
          columns={renderColumnsHotelBookings(onChangeStatus)}
          rowKey="id"
          dataSource={bookings}
          pagination={pagination}
          loading={fetchingBooking}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default BookingHotelList;
