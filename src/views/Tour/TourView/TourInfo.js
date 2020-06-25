import React, { useState } from 'react';
import { Col, Divider, Form, Input, InputNumber, Row, Switch, Select, Button, notification, Upload } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { provinces } from '../../../constant/province';
import { utilities } from '../../../constant/hotel';
import { transportations } from '../../../constant/tour';
import { tourService } from '../../../services';
import { uploadImage } from '../../../services/imgur';

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  },
};

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const TourInfo = (props) => {
  const {
    tour,
    onFetchTour,
  } = props;
  const [form] = Form.useForm();
  const [countImage, setCountImage] = useState(tour.images.length);
  const [countAvatar, setCountAvatar] = useState(1);
  const {
    images,
    organizerAvatar,
  } = tour;
  const formInitialValues = {
    ...tour,
    images: images.map(el => ({
      uid: el,
      url: el,
      name: el,
      status: 'done',
      thumbUrl: el,
    })),
    organizerAvatar: [
      {
        uid: organizerAvatar,
        url: organizerAvatar,
        name: organizerAvatar,
        status: 'done',
        thumbUrl: organizerAvatar,
      }
    ]
  };
  const rules = {
    name: [{ required: true, message: 'Vui lòng nhập tên' }],
    cityOrProvince: [{ required: true, message: 'Vui lòng chọn tỉnh / thành' }],
    commonAddress: [{ required: true, message: 'Vui lòng nhập địa chỉ' }],
    duration: [{ required: true, message: 'Vui lòng thời lượng tour' }],
    minSize: [
      { required: true, message: 'Vui lòng nhập số lượng khách tối thiểu' },
    ],
    maxSize: [
      { required: true, message: 'Vui lòng nhập số lượng khách tối đa' },
    ],
    pricePerParticipant: [{ required: true, message: 'Vui lòng nhập giá' }],
    description: [{ required: true, message: 'Vui lòng nhập mô tả' }],
    transportations: [
      { required: true, message: 'Vui lòng chọn một vài phương tiện' },
    ],
    images: [{ required: true, message: 'Vui lòng chọn ít nhất 1 ảnh' }],
    organizerName: [{ required: true, message: 'Vui lòng nhập tên' }],
    organizerPhoneNumber: [{ required: true, message: 'Vui lòng nhập SĐT' }],
    organizerEmail: [{ required: true, message: 'Vui lòng nhập email' }],
    organizerAvatar: [{ required: true, message: 'Vui lòng chọn 1 ảnh' }],
  };

  const onFinish = (values) => {
    const {
      transportations,
      images,
      organizerAvatar,
      ...rest
    } = values;
    rest.transportations = transportations.join(',');
    rest.images = images.map(x => x.response ? x.response.url : x.url).join(',');
    rest.organizerAvatar = organizerAvatar[0].response ? organizerAvatar[0].response.url : organizerAvatar[0].url;
    tourService.updateTour(tour.id, rest)
      .then(() => {
        notification.success({
          message: 'Chỉnh sửa thành công',
        });
        onFetchTour();
      })
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      initialValues={formInitialValues}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="isActive" label="Hiệu lực" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Tên tour" rules={rules.name}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="cityOrProvince"
            label="Tỉnh / Thành phố"
            rules={rules.cityOrProvince}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase().trim()) >= 0
              }
            >
              {provinces.map(el => (
                <Select.Option key={el.code} value={el.code}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="commonAddress"
            label="Địa chỉ chung"
            rules={rules.commonAddress}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="duration"
            label="Thời lượng tour (ngày)"
            rules={rules.duration}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="minSize"
            label="Số khách (tối thiểu)"
            rules={rules.minSize}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="maxSize"
            label="Số khách (tối đa)"
            rules={rules.maxSize}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="transportations"
            label="Các phương tiện"
            rules={rules.transportations}
          >
            <Select mode="multiple" allowClear>
              {transportations.map(el => (
                <Select.Option key={el.code} value={el.code}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="pricePerParticipant"
            label="Giá vé (một khách)"
            rules={rules.pricePerParticipant}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Mô tả tour (cụ thể)"
            rules={rules.description}
          >
            <Input.TextArea rows="5" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="images"
            label="Hình ảnh tour"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={rules.images}
          >
            <Upload
              onRemove={() => setCountImage(countImage - 1)}
              customRequest={options => {
                uploadImage(options.file)
                  .then(res => {
                    setCountImage(countImage + 1);
                    options.onSuccess(res, res);
                  })
                  .catch(err => {
                    notification.error({
                      message: 'Tải lỗi, vui lòng thử lại',
                    });
                    const images = form.getFieldValue('images');
                    form.setFieldsValue({
                      image: images.slice(0, countImage),
                    });
                    options.onError(err);
                  });
              }}
              listType="picture"
            >
              {countImage < 2 && (
                <Button>
                  <UploadOutlined /> Tải ảnh lên
                </Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left">Thông tin người quản lý tour</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="organizerName"
            label="Tên"
            rules={rules.organizerName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="organizerPhoneNumber"
            label="Số điện thoại liên hệ"
            rules={rules.organizerPhoneNumber}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="organizerEmail"
            label="Email"
            rules={rules.organizerEmail}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="organizerAvatar"
            label="Ảnh đại diện"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={rules.organizerAvatar}
          >
            <Upload
              onRemove={() => setCountAvatar(0)}
              customRequest={options => {
                uploadImage(options.file)
                  .then(res => {
                    setCountAvatar(1);
                    options.onSuccess(res, res);
                  })
                  .catch(err => {
                    notification.error({
                      message: 'Tải lỗi, vui lòng thử lại',
                    });
                    form.setFieldsValue({
                      organizerAvatar: [],
                    });
                    options.onError(err);
                  });
              }}
              listType="picture"
            >
              {countAvatar === 0 && (
                <Button>
                  <UploadOutlined /> Tải ảnh lên
                </Button>
              )}
            </Upload>
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
  )



};

export default TourInfo;
