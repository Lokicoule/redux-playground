import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import * as actionsCreator from './actions';

const unsubscribe = store.subscribe(() => {
    console.log("Store changed", store.getState());
    
  })
store.dispatch(actionsCreator.taskAdded("description1"));
console.log(store.getState());
store.dispatch(actionsCreator.taskDone(1));
console.log(store.getState());
store.dispatch(actionsCreator.taskRemoved(1));
console.log(store.getState());
unsubscribe();
store.dispatch(actionsCreator.taskAdded("description2"));
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
