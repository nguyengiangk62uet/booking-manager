/* eslint-disable */
import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { v4 as uuid } from 'uuid';
import AppBreadcrumb from 'containers/AppLayout/AppBreadcrumb';

const { Content } = Layout;

const AppContent = props => {
  const { filteredRoutes } = props;

  return (
    <Content className="app-content m-3">
      <Suspense fallback={null}>
        <Switch>
          {filteredRoutes.map(({ component: Component, ...rest }) => {
            return (
              <Route
                {...rest}
                key={uuid()}
                render={routeProps => {
                  const crumbs = filteredRoutes
                    // Get all routes that contain the current one
                    .filter(({ path }) => routeProps.match.path.includes(path))
                    // Swap out any dynamic routes with their param values
                    // E.g. "/products/:id" will become "/products/1"
                    .map(({ path, ...rest }) => ({
                      path: Object.keys(routeProps.match.params).length
                        ? Object.keys(routeProps.match.params).reduce(
                            (path, param) =>
                              path.replace(
                                `:${param}`,
                                routeProps.match.params[param],
                              ),
                            path,
                          )
                        : path,
                      ...rest,
                    }));
                  return (
                    <>
                      <AppBreadcrumb crumbs={crumbs} />
                      <Component {...routeProps} title={rest.name} />
                    </>
                  );
                }}
              />
            );
          })}
          <Redirect from="/" to="/404" />
        </Switch>
      </Suspense>
    </Content>
  );
};

export default AppContent;
