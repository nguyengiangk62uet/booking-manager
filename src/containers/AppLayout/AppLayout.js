import React from 'react';
import { Layout } from 'antd';
import routes from 'routes';
import AppSider from './AppSider';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import './AppLayout.scss';

const AppLayout = () => {
  const filteredNavigation = routes;
  const filteredRoutes = filteredNavigation.filter(
    (item) => !item.children && item.component,
  );

  return (
    <Layout className="app-layout">
      <AppSider filteredNavigation={filteredNavigation} />
      <Layout>
        <AppHeader />
        <AppContent filteredRoutes={filteredRoutes} />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
