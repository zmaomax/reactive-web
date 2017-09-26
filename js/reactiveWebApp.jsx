import React from 'react';
import { render } from 'react-dom';
import MainPage from './pages/mainPage';
import style from '../sass/app.scss';

const App = () => (
  <div className="app">
    <div className="landing">
      <MainPage />
    </div>
  </div>
);

render(<App />, document.getElementById('app'));
