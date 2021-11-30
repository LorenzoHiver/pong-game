import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './index.css';

import Loader from './atoms/Loader'

const App = React.lazy(() => import('./pages/App'))

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
