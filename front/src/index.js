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

const PongGame = React.lazy(() => pMinDelay(import('./pages/PongGame'), 1500) )
const Home = React.lazy(() => pMinDelay(import('./pages/Home'), 1500) )


ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pong" element={<PongGame />} />
      </Routes>
    </Router>
  </Suspense>
  ,
  document.getElementById('root')
);
