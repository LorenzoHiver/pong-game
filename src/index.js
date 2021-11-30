import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './index.css';

const App = React.lazy(() => import('./pages/App'))
const Loader = React.lazy(() => import('./atoms/Loader'))

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
