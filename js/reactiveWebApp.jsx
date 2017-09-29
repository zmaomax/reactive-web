import React from 'react';
import { render } from 'react-dom';
import MainPage from './pages/mainPage';
import DetailPage from './pages/detailPage';
import style from '../sass/app.scss';
import { Router, Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/detail/:id' component={DetailPage} />
    </Switch>
  </BrowserRouter>
);

render(<App />, document.getElementById('app'));
