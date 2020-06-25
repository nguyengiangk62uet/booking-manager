import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { browserHistory } from 'helpers';
import Login from 'views/Login';
import { PrivateRoute } from 'components';
import AppLayout from 'containers/AppLayout';
import './App.scss';
import 'configs';

function App() {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/login" name="login" component={Login} />
        <PrivateRoute path="/" name="Trang chủ" component={AppLayout} />
      </Switch>
    </Router>
  );
}

export default App;
