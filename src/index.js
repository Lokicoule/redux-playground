import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { loadTasks, addTask, doTask, assignTaskToUser } from './store/tasks';

const store = configureStore();
store.dispatch(loadTasks());
store.dispatch(addTask({description:"loik"}));
store.dispatch(doTask(3));
store.dispatch(assignTaskToUser(4, 2));

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
