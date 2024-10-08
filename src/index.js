import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App'; // Adjust the path as needed
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
