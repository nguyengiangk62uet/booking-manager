import React, { useState } from 'react';
import { Form, Card, Input, Row, Col, Select, TimePicker, Divider, InputNumber, Button, Upload, Switch, notification, Steps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { provinces } from 'constant/province';
import { roomTypes, utilities } from 'constant/hotel';
import { uploadImage } from 'services/imgur';
import { hotelService } from '../../../services';
import HotelCommonInfo from './HotelCommonInfo';
import HotelRoom from './HotelRoom';
import HotelPayment from '../HotelView/HotelPayment';
import { browserHistory } from 'helpers';

const { Step } = Steps;

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  },
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const uploadAction = (file) => {
  return uploadImage(file);
};

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const HotelAdd = () => {
  const [commonInfo, setCommonInfo] = useState({});
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const stickyBottom = (buttonText) => {
    return (
      <div className="sticky-bottom">
        <Button type="primary" htmlType="submit">
          {buttonText || 'Tiếp tục'}
        </Button>
      </div>
    );
  };

  const steps = [
    {
      title: 'Thông tin cơ bản',
      content: (
        <HotelCommonInfo
          next={next}
          stickyBottom={stickyBottom()}
          commonInfo={commonInfo}
          setCommonInfo={setCommonInfo}
        />
      ),
    },
    {
      title: 'Thông tin phòng',
      content: (
        <HotelRoom
          stickyBottom={stickyBottom('Lưu và tiếp tục')}
          commonInfo={commonInfo}
          setCommonInfo={setCommonInfo}
        />
      ),
    },
  ];

  return (
    <Card
      title="Tạo mới khách sạn"
    >
      <Steps className="mb-base px-base" current={step}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ paddingBottom: 72 }}>
        {steps[step] && steps[step].content}
      </div>
    </Card>
  )
};

export default HotelAdd;
