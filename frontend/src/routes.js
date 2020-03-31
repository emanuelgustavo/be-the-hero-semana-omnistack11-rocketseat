import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Initial from './pages/Initial';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Search from './pages/Search';
import NewIncident from './pages/NewIncident';
import Dashboard from './pages/Dashboard';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Initial} />
        <Route path="/logon" component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/search" component={Search} />
        <Route path="/incidents/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}