import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import * as actions from './store/api';
import { loadTasks, doTask, assignTaskToUser } from './store/tasks';

const store = configureStore();
store.dispatch(loadTasks());

store.dispatch(doTask(1));
store.dispatch(assignTaskToUser(2, 3));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
