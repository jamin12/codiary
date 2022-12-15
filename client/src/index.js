import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// TODO(경민 -> 이묘): 재 랜더링 안되게 해야함
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// pm2 start --name codiary node_modules/react-scripts/scripts/start.js -i 1 --no-daemon,
