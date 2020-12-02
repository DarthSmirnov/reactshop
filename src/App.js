import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './routes';

const App = () => (
  <Layout>
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Switch>
  </Layout>
);

export default App;
