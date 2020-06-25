import { Button, Tag, Tooltip, Dropdown, Menu, Modal } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import { ZoomInOutlined } from '@ant-design/icons';
import { roomTypes, status as allStatus } from '../../../../constant/hotel';

const renderRoom = (code) => {
  const type = roomTypes.find(x => x.code === code);
  if (type)
    return type.name;
  return null;
};

const renderStatus = (code) => {
  const stt = allStatus.find(x => x.code === code);
  if (stt)
    return stt.name;
  return null;
};

export const renderColumnsHotelBookings = (onChangeStatus) => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 70,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status, item) => {
        const menu = (
          <Menu>
            {allStatus.filter(x => x.code !== status).map(el => (
              <Menu.Item onClick={() => onChangeStatus(item.id, el.code)} key={el.code}>{el.name}</Menu.Item>
            ))}
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Tooltip title="Bấm để sửa">
              <Tag color="red">{renderStatus(status)}</Tag>
            </Tooltip>
          </Dropdown>
        )
      },
      align: 'center',
    },
    {
      title: 'Thanh toán',
      key: 'view',
      render: (text, item) => {
        const handleViewPayment = () => {
          if (!item.imageWitness) {
            Modal.info({
              title: 'Thông báo',
              content: (
                <div>Đơn đặt phòng chưa thanh toán</div>
              ),
              onOk() {},
            });
            return;
          }
          Modal.info({
            title: 'Thông tin thanh toán',
            content: (
              <div>
                <div>Ngân hàng: {item.bankCode}</div>
                <div>Tên tài khoản: {item.accountName}</div>
                <div>Số tiền: {item.paided}</div>
                <img width="100%" height="100%" src={item.imageWitness} />
              </div>
            ),
            onOk() {},
          })
        };
        return (
          <Button type="link" onClick={handleViewPayment}>Xem thanh toán</Button>
        )
      },
      align: 'center',
    },
    {
      title: 'Khách đặt phòng',
      render: (text, item) => {
        return (
          <>
            <div>Tên: {item.guestName}</div>
            <div>SĐT: {item.guestPhoneNumber}</div>
            <div>Email: {item.guestEmail}</div>
          </>
        )
      },
      key: 'abc',
      align: 'center',
    },
    {
      title: 'Thông tin phòng',
      render: (text, item) => {
        return (
          <>
            <div>Khách sạn: {item.hotel.name}</div>
            <div>Loại phòng: {renderRoom(item.roomType)}</div>
            <div>Số phòng: {item.rooms}</div>
            <div>Số khách: {item.guests}</div>
          </>
        )
      },
      key: 'def',
      align: 'center',
    },
    {
      title: 'Thông tin giá',
      render: (text, item) => {
        return (
          <>
            <div>Giá phòng / 1 đêm: {item.roomPrice} VNĐ</div>
            <div>Thuế: {item.roomTax} %</div>
            <div>Tổng tiền: {item.grandTotal} VNĐ</div>
          </>
        )
      },
      key: 'ghi',
      align: 'center',
    },
    {
      title: 'Ngày checkin',
      dataIndex: 'checkinDate',
      align: 'center',
    },
    {
      title: 'Ngày checkout',
      dataIndex: 'checkoutDate',
      align: 'center',
    },
  ];
};
