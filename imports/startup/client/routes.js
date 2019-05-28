import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Main from '../../ui/pages/main';
import Custom from '../../ui/pages/custom'
import Profile from '../../ui/pages/profile'

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
      <div>
        <Route exact path="/custom/:domain" component={Custom}/>
        <Route exact path="/new-card/1" component={Custom}/>
        <Route exact path="/:domain" component={Profile}/>
        <Route exact path="/" component={Main}/>
      </div>
  </Router>
);