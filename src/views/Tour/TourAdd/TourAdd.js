import React, { useState } from 'react';
import {
  Card,
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  notification,
  Switch,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadImage } from '../../../services/imgur';
import { provinces } from '../../../constant/province';
import { transportations } from '../../../constant/tour';
import { tourService } from '../../../services';
import { browserHistory } from 'helpers';

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const TourAdd = () => {
  const [info, setInfo] = useState({});
  const [countImage, setCountImage] = useState(0);
  const [countAvatar, setCountAvatar] = useState(0);

  const [form] = Form.useForm();
  const formInitialValues = {
    isActive: true,
    name: undefined,
    cityOrProvince: undefined,
    commonAddress: undefined,
    duration: undefined,
    minSize: undefined,
    maxSize: undefined,
    pricePerParticipant: undefined,
    description: undefined,
    transportations: [],
    images: [],
    organizerName: undefined,
    organizerPhoneNumber: undefined,
    organizerEmail: undefined,
    organizerAvatar: undefined,
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

  const onFinish = values => {
    const { images, organizerAvatar, transportations, ...rest } = values;
    rest.images = images.map(x => x.response.url).join(',');
    rest.organizerAvatar = organizerAvatar[0].response.url;
    rest.transportations = transportations.join(',');
    tourService.createTour(rest).then((data) => {
      notification.success({
        message: 'Tạo mới tour thành công',
      });
      browserHistory.push(`/tours/${data.result.id}`);
    });
  };

  return (
    <Card title="Tạo mới tour">
      <Form
        {...formItemLayout}
        form={form}
        initialValues={formInitialValues}
        onFinish={onFinish}
        scrollToFirstError
        style={{ paddingBottom: 72 }}
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
        <div className="sticky-bottom">
          <Button type="primary" htmlType="submit">
            Tạo mới
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default TourAdd;
