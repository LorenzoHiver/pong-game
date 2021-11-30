import React, { Suspense } from 'react';
import pMinDelay from 'p-min-delay';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './index.css';

import Loader from './atoms/Loader'

const App = React.lazy(() => pMinDelay(import('./pages/App'), 1500) )

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
      </Routes>
    </Router>
  </Suspense>
  ,
  document.getElementById('root')
);
