import React from 'react';
import { Form, Row, Col, Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { formHelpers } from 'helpers';

const { resetFilter, getFormInitialValues, processNewFormValues } = formHelpers;

const HotelFilter = (props) => {
  const { queryParams, setQueryParams } = props;
  const [form] = Form.useForm();

  const formInitialValues = {
    ...getFormInitialValues(queryParams),
  };

  const onFinish = async (values) => {
    const newQueryParams = {
      ...processNewFormValues(queryParams, values),
      page: 1,
    };
    setQueryParams(newQueryParams);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={formInitialValues}
    >
      <Row gutter={16} className="mx-2 my-3">
        <Col span={8}>
          <Form.Item name="query">
            <Input
              placeholder="Nhập tên khách sạn"
              maxLength={255}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button type="primary" htmlType="submit">
            <SearchOutlined />
            Tìm kiếm
          </Button>
        </Col>
      </Row>
    </Form>
  )

};

export default HotelFilter;
