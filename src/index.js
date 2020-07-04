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

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());

});
store.dispatch(userAdded({
  name: "me"
}));
store.dispatch(projectAdded({
  name: "test"
}));

store.dispatch(taskAdded({ description: "description1" }));
console.log(store.getState());

store.dispatch(taskDone({ id: 1 }));
console.log(store.getState());

unsubscribe();

store.dispatch(taskAdded({ description: "description2" }));
console.log(store.getState());

const doneTasks1 = getDoneTasks(store.getState());
const doneTasks2 = getDoneTasks(store.getState());
console.log("memoized : ", doneTasks1 === doneTasks2);

store.dispatch(taskAssignedToUser({
  taskId: 1,
  userId: 1
}))

console.log(store.getState());
const myTasks = getTasksByUser(1)(store.getState());
console.log(myTasks);

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
