import { useState, useEffect } from 'react';
import _ from 'lodash';
import { browserHistory, objectHelpers } from '../helpers';
import { hotelBookingService } from '../services';

const { getQueryStringFromObj } = objectHelpers;

export const useBookingHotelsData = (defaultParams = {}) => {
  const [bookings, setBookings] = useState([]);
  const [queryParams, setQueryParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  });

  const getHotelBookings = async params => {
    try {
      setLoading(true);
      const res = await hotelBookingService.getHotelBookings(params);
      if (res.result) {
        const { hotelBookings, total, page, pageSize } = res.result;
        setBookings(hotelBookings);
        const pager = { ...pagination };
        pager.total = total;
        pager.current = page;
        pager.pageSize = pageSize;
        setPagination(pager);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = pagination => {
    const newQueryParams = {
      ...queryParams,
      page: pagination.current,
      pageSize: pagination.pageSize,
    };
    setQueryParams(newQueryParams);
  };

  useEffect(() => {
    if (!_.isEqual(defaultParams, queryParams)) {
      browserHistory.push({
        search: getQueryStringFromObj(queryParams),
      });
    } else {
      getHotelBookings(queryParams);
    }
  }, [queryParams]);

  return {
    bookings,
    pagination,
    handleTableChange,
    queryParams,
    setQueryParams,
    fetchingBooking: loading,
  };
};
