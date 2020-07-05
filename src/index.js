import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import {
  taskAdded,
  taskDone,
  taskAssignedToUser,
  getTasksByUser,
  getDoneTasks
} from './store/tasks';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

const store = configureStore();

store.dispatch((dispatch, getState) => {
  // Call an API
  // when promise is resolved => dispatch
  dispatch({
    type : 'tasksReceived', 
    tasks: [1, 2, 3]
  })
  console.log(getState());
  
  // if promise is rejected => dispatch
});

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
