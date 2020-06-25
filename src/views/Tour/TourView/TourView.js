import React, { useState, useEffect } from 'react';
import { Card, Tabs, Button } from 'antd';
import { tourService } from '../../../services';
import { browserHistory } from '../../../helpers';
import TourInfo from './TourInfo';
import TourPayment from './TourPayment';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

const TourView = (props) => {
  const tourId = props.match.params.id;
  const [tour, setTour] = useState();
  const fetchTour = () => {
    tourService.getTour(tourId)
      .then(data => {
        setTour(data.result.tour)
      })
      .catch(() => {
        // browserHistory.push('/hotels');
      });
  };

  useEffect(() => {
    fetchTour();
  }, [tourId]);

  return (
    <Card
      title={tour ? tour.name : 'Đang tải ...'}
      extra={(
        <Link to="/tours">
          <Button>Quay lại</Button>
        </Link>
      )}
    >
      {tour && (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin cơ bản" key="1">
            <TourInfo tour={tour} onFetchTour={fetchTour} />
          </TabPane>
          <TabPane tab="Thông tin thanh toán" key="3">
            <TourPayment tour={tour} />
          </TabPane>
        </Tabs>
      )}
    </Card>
  );
};

export default TourView;
