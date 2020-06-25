import React, { useState, useEffect } from 'react';
import { Card, Tabs, Button } from 'antd';
import { hotelService } from '../../../services';
import { browserHistory } from '../../../helpers';
import HotelCommonInfo from './HotelCommonInfo';
import HotelRoom from './HotelRoom';
import HotelPayment from './HotelPayment';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

const HotelView = (props) => {
  const hotelId = props.match.params.id;
  const [hotel, setHotel] = useState();
  const fetchHotel = () => {
    hotelService.getHotel(hotelId)
      .then(data => {
        setHotel(data.result.hotel)
      })
      .catch(() => {
        // browserHistory.push('/hotels');
      });
  };

  useEffect(() => {
    fetchHotel();
  }, [hotelId]);

  return (
    <Card
      title={hotel ? hotel.name : 'Đang tải ...'}
      extra={(
        <Link to="/hotels">
          <Button>Quay lại</Button>
        </Link>
      )}
    >
      {hotel && (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin cơ bản" key="1">
            <HotelCommonInfo hotel={hotel} onFetchHotel={fetchHotel} />
          </TabPane>
          <TabPane tab="Thông tin phòng" key="2">
            <HotelRoom hotel={hotel} onFetchHotel={fetchHotel} />
          </TabPane>
          <TabPane tab="Thông tin thanh toán" key="3">
            <HotelPayment hotel={hotel} />
          </TabPane>
        </Tabs>
      )}
    </Card>
  );
};

export default HotelView;
