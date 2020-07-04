import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import * as actions from './store/tasks';
import {projectAdded} from './store/projects';

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());

});
store.dispatch(projectAdded({
  name:"test"
}));
store.dispatch(actions.taskAdded({description: "description1"}));
console.log(store.getState());
store.dispatch(actions.taskDone({id: 1}));
console.log(store.getState());
//store.dispatch(actions.taskRemoved({id: 1}));
console.log(store.getState());
unsubscribe();
store.dispatch(actions.taskAdded({description: "description2"}));
console.log(store.getState()); 

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
