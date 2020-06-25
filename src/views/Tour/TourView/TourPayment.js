import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider, Row, Col, Select, notification, Descriptions } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { bank } from '../../../constant/hotel';
import { tourService, paymentInformationService } from '../../../services/index';

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  },
};

const TourPayment = (props) => {
  const { tour } = props;
  const [form] = Form.useForm();
  const formInitialValues = {
    bankCode: undefined,
    accountName: undefined,
    accountNumber: undefined,
  };
  const rules = {
    bankCode: [{ required: true, message: 'Vui lòng chọn ngân hàng' }],
    accountName: [{ required: true, message: 'Vui lòng nhập tên tài khoản' }],
    accountNumber: [{ required: true, message: 'Vui lòng nhập số tài khoản' }],
  };
  const [payments, setPayments] = useState([]);
  const fetchPaymentInformationOnTour = () => {
    tourService.getAllPayment(tour.id)
      .then(res => {
        setPayments(res.result.tourPaymentInformations);
      })
  };
  const onFinish = (values) => {
    paymentInformationService.createTourPaymentInformation({ ...values, tourId: tour.id })
      .then(() => {
        notification.success({
          message: 'Thêm thanh toán thành công',
        });
        fetchPaymentInformationOnTour();
      })
      .finally(() => form.resetFields())
  };

  useEffect(() => {
    fetchPaymentInformationOnTour();
  }, []);

  return (
    <>
      <Divider orientation="left">Danh sách tài khoản thanh toán</Divider>
      <Row gutter={16}>
        {payments.length ? payments.map(el => (
          <Col key={el.id} span={12} className="mt-2">
            <Descriptions title="Thông tin tài khoản" layout="vertical" bordered>
              <Descriptions.Item label="Ngân hàng">{bank.find(x => x.code === el.bankCode).name}</Descriptions.Item>
              <Descriptions.Item label="Số tài khoản">{el.accountNumber}</Descriptions.Item>
              <Descriptions.Item label="Tên tài khoản">{el.accountName}</Descriptions.Item>
            </Descriptions>
          </Col>
        )) : (
            <div className="text-muted text-center w-100">Chưa thêm tài khoản thanh toán nào</div>
          )}
      </Row>
      <Divider orientation="left">Thêm tài khoản thanh toán</Divider>
      <Form
        form={form}
        initialValues={formInitialValues}
        onFinish={onFinish}
        {...formItemLayout}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="bankCode" label="Ngân hàng" rules={rules.bankCode}>
              <Select>
                {bank.map(el => (
                  <Select.Option key={el.code} value={el.code}>
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="accountName" label="Tên tài khoản" rules={rules.accountName}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="accountNumber" label="Số tài khoản" rules={rules.accountNumber}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <SaveOutlined />
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};

export default TourPayment;
