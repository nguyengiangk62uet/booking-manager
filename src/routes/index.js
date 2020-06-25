import { lazy } from 'react';
import { t } from 'helpers/i18n';

import { HomeOutlined, EditOutlined, FieldBinaryOutlined, ScheduleOutlined, FlagOutlined } from '@ant-design/icons';

// Home page
const Home = lazy(() => import('views/Home'));

const Page404 = lazy(() => import('views/Page404'));
const HotelAdd = lazy(() => import('views/Hotel/HotelAdd'));
const HotelView = lazy(() => import('views/Hotel/HotelView'));
const HotelList = lazy(() => import('views/Hotel/HotelList'));
const TourAdd = lazy(() => import('views/Tour/TourAdd'));
const TourList = lazy(() => import('views/Tour/TourList'));
const TourView = lazy(() => import('views/Tour/TourView'));
const BookingHotelList = lazy(() => import('views/Booking/BookingHotel/BookingHotelList'));

/*
 * If route has children => it's a parent menu
 */
const routes = [
  {
    exact: true,
    path: '/',
    name: t('Home'),
    component: Home,
    icon: HomeOutlined,
  },
  {
    path: '/hotels',
    name: 'Khách sạn',
    icon: FieldBinaryOutlined,
    children: ['/hotels', '/hotels/add'],
  },
  {
    exact: true,
    path: '/hotels',
    name: 'Danh sách khách sạn',
    component: HotelList,
  },
  {
    exact: true,
    path: '/hotels/add',
    name: 'Thêm mới khách sạn',
    component: HotelAdd,
  },
  {
    exact: true,
    path: '/hotels/:id',
    name: 'Chi tiết khách sạn',
    component: HotelView,
  },
  {
    path: '/tours',
    name: 'Tours',
    icon: FlagOutlined,
    children: ['/tours', '/tours/add'],
  },
  {
    exact: true,
    path: '/tours',
    name: 'Danh sách tour',
    component: TourList,
  },
  {
    exact: true,
    path: '/tours/add',
    name: 'Thêm mới tour',
    component: TourAdd,
  },
  {
    exact: true,
    path: '/tours/:id',
    name: 'Chi tiết tour',
    component: TourView,
  },
  {
    name: 'Booking',
    icon: ScheduleOutlined,
    children: ['/booking-hotels', '/booking-tours'],
  },
  {
    exact: true,
    path: '/booking-hotels',
    name: 'Danh sách đặt khách sạn',
    component: BookingHotelList,
  },
  {
    exact: true,
    path: '/booking-tours',
    name: 'Danh sách đặt tours',
    component: Home,
  },
  {
    exact: true,
    path: '*',
    name: t('404'),
    component: Page404,
  },
];

export default routes;
