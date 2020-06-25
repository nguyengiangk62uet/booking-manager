import React from 'react';
import { browserHistory, objectHelpers } from 'helpers';
import { useHotelsData } from 'hooks/hotel';
import { Card, Table, notification } from 'antd';
import { renderColumnsHotels } from './helper';
import HotelFilter from './HotelFilter';
import { hotelService } from '../../../services';

const { getObjFromQueryString } = objectHelpers;

const HotelList = () => {
  const { location } = browserHistory;
  const defaultParams = location.search
    ? getObjFromQueryString(location.search)
    : { page: 1, pageSize: 10 };

  const {
    hotels,
    pagination,
    handleTableChange,
    queryParams,
    setQueryParams,
    fetchingHotel,
    reload,
  } = useHotelsData(defaultParams);

  const handleDeleteHotel = (id) => {
    hotelService.deleteHotel(id)
      .then(() => {
        notification.success({ message: "Xóa thành công"});
        reload();
      })
  }

  return (
    <div className="seller-block">
      <Card
        title="Tìm kiếm khách sạn"
        bodyStyle={{
          padding: 0,
        }}
      >
        <HotelFilter queryParams={queryParams} setQueryParams={setQueryParams} />
      </Card>
      <Card
        className="mt-3"
        title="Danh sách khách sạn"
        extra={
          <span className="total">
            Tổng số khách sạn: {pagination.total || 0}
          </span>
        }
        bodyStyle={{
          padding: '1rem',
        }}
      >
        <Table
          bordered
          columns={renderColumnsHotels(handleDeleteHotel)}
          rowKey="id"
          dataSource={hotels}
          pagination={pagination}
          loading={fetchingHotel}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default HotelList;
