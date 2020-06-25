import { useState, useEffect } from 'react';
import _ from 'lodash';
import { browserHistory, objectHelpers } from '../helpers';
import { hotelService } from '../services';

const { getQueryStringFromObj } = objectHelpers;

export const useHotelsData = (defaultParams = {}) => {
  const [hotels, setHotels] = useState([]);
  const [queryParams, setQueryParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  });

  const getHotels = async params => {
    try {
      setLoading(true);
      const res = await hotelService.getHotels(params);
      if (res.result) {
        const { hotels, total, page, pageSize } = res.result;
        setHotels(hotels);
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
      getHotels(queryParams);
    }
  }, [queryParams]);

  const reload = () => getHotels(queryParams);

  return {
    hotels,
    pagination,
    handleTableChange,
    queryParams,
    setQueryParams,
    fetchingHotel: loading,
    reload,
  };
};
