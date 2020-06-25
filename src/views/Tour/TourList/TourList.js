import React from 'react';
import { browserHistory, objectHelpers } from 'helpers';
import { useToursData } from 'hooks/tour';
import { Card, Table, notification } from 'antd';
import { renderColumnsTours } from './helper';
import TourFilter from './TourFilter';
import { tourService } from '../../../services';

const { getObjFromQueryString } = objectHelpers;

const TourList = () => {
  const { location } = browserHistory;
  const defaultParams = location.search
    ? getObjFromQueryString(location.search)
    : { page: 1, pageSize: 10 };

  const {
    tours,
    pagination,
    handleTableChange,
    queryParams,
    setQueryParams,
    fetchingTour,
    reload,
  } = useToursData(defaultParams);

  const handleDeleteTour = (id) => {
    tourService.deleteTour(id)
      .then(() => {
        notification.success({ message: "Xóa thành công" });
        reload();
      })
  }

  return (
    <div className="seller-block">
      <Card
        title="Tìm kiếm tour"
        bodyStyle={{
          padding: 0,
        }}
      >
        <TourFilter queryParams={queryParams} setQueryParams={setQueryParams} />
      </Card>
      <Card
        className="mt-3"
        title="Danh sách tour"
        extra={
          <span className="total">
            Tổng số tour: {pagination.total || 0}
          </span>
        }
        bodyStyle={{
          padding: '1rem',
        }}
      >
        <Table
          bordered
          columns={renderColumnsTours(handleDeleteTour)}
          rowKey="id"
          dataSource={tours}
          pagination={pagination}
          loading={fetchingTour}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default TourList;
