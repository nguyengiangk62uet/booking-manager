import { useState, useEffect } from 'react';
import _ from 'lodash';
import { browserHistory, objectHelpers } from '../helpers';
import { tourService } from '../services';

const { getQueryStringFromObj } = objectHelpers;

export const useToursData = (defaultParams = {}) => {
  const [tours, setTours] = useState([]);
  const [queryParams, setQueryParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  });

  const getTours = async params => {
    try {
      setLoading(true);
      const res = await tourService.getTours(params);
      if (res.result) {
        const { tours, total, page, pageSize } = res.result;
        setTours(tours);
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
      getTours(queryParams);
    }
  }, [queryParams]);

  const reload = () => getTours(queryParams);

  return {
    tours,
    pagination,
    handleTableChange,
    queryParams,
    setQueryParams,
    fetchingTour: loading,
    reload,
  };
};
