// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import { browserHistory } from 'helpers';

export default ({ component: Component, ...rest }) => {
  // lấy currentUser từ localStorage
  const currentUser = {
    name: 'Ductt',
    picture: '',
  };

  // Show spin when fetching data
  if (!currentUser) {
    browserHistory.push('/login');
  }

  return (
    <Route
      {...rest}
      render={routeProps => (
        <Component {...routeProps} activeUser={currentUser} />
      )}
    />
  );
};
