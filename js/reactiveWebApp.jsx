import React from 'react';
import { render } from 'react-dom';
import MainPage from './pages/mainPage';
import DetailPage from './pages/detailPage';
import ListPage from './pages/listPage';
import style from '../sass/app.scss';
import { Router, Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => (
  <div className="app">
    <div className="iphone-wrap">
      <div className="iphone-mask"></div>
      <div className="main-page page-container">
        <div className="title-page">
          <h2 className="text-center">Z-Foodies</h2>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/detail/:id' component={DetailPage} />
            <Route path='/list/:type' component={ListPage} />
          </Switch>
        </BrowserRouter>
      </div>
      </div>
  </div>
);

render(<App />, document.getElementById('app'));
