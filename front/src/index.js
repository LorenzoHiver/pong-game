import React, { Suspense } from 'react';
import pMinDelay from 'p-min-delay';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { StateProvider } from './store'

import './index.css';

import Loader from './atoms/Loader'

require('dotenv').config()

const PongGame = React.lazy(() => pMinDelay(import('./pages/PongGame'), 1500))
const Home = React.lazy(() => pMinDelay(import('./pages/Home'), 1500))


ReactDOM.render(
  <StateProvider>
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/pong" element={<PongGame />} />
        </Routes>
      </Router>
    </Suspense>
  </StateProvider>
  ,
  document.getElementById('root')
);
