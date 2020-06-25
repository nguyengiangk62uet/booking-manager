import { Button, Tag, Avatar, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import { ZoomInOutlined, CloseOutlined } from '@ant-design/icons';

export const renderColumnsTours = (handleDeleteTour) => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 70,
    },
    {
      title: 'Tên tour',
      dataIndex: 'name',
    },
    {
      title: 'Hình ảnh',
      render: (images) => {
        return (
          <Avatar src={images[0]} size={100} />
        )
      },
      dataIndex: 'images',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      render: (text, item) =>
        item.isActive ? (
          <Tag color="green">Hiệu lực</Tag>
        ) : (
            <Tag color="red">Vô hiệu</Tag>
          ),
      key: 'isActive',
      align: 'center',
    },
    {
      title: 'Thông tin chung',
      render: (text, item) => {
        return (
          <>
            <div>Giá / 1 người: {item.pricePerParticipant || 0} VNĐ</div>
            <div>Thời lượng tour: {item.duration} ngày</div>
            <div>Số người: {item.minSize} {' -> '} {item.maxSize}</div>
          </>
        )
      },
      key: 'common',
      align: 'center',
    },
    {
      title: 'Người quản lý tour',
      render: (text, item) => {
        return (
          <>
            <div>Tên: {item.organizerName}</div>
            <div>SĐT: {item.organizerPhoneNumber}</div>
            <div>Email: {item.organizerEmail}</div>
          </>
        )
      },
      key: 'organizer',
      align: 'center',
    },
    {
      render: (text, item) => (
        <>
          <Link to={`/tours/${item.id}`}>
            <Button
              type="primary"
              title="Chi tiết"
            >
              <ZoomInOutlined />
            </Button>
          </Link>
          {/* <Popconfirm title="Xóa khách sạn" onConfirm={() => handleDeleteHotel(item.id)}>
            <Button
              className="ml-2"
              type="danger"
              title="Xóa"
            >
              <CloseOutlined />
            </Button>
          </Popconfirm> */}
        </>
      ),
      key: 'action',
      align: 'center',
    },
  ];
};
