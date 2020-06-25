/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const AppBreadcrumb = props => {
  const { crumbs } = props;

  const itemRender = (route, params, routes) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.name}</span>
    ) : (
      <Link to={route.path}>{route.name}</Link>
    );
  };

  return (
    <Breadcrumb
      className="app-breadcrumb"
      itemRender={itemRender}
      routes={crumbs}
    />
  );
};

export default AppBreadcrumb;
