import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import * as actionCreators from './actions';


const unsubscribe = store.subscribe(() => {
    console.log("handle store change!", store.getState());
});

store.dispatch(actionCreators.taskAdded("desc1"));
console.log("1", store.getState());
store.dispatch(actionCreators.taskRemoved(1));
console.log("2", store.getState());
unsubscribe();
store.dispatch(actionCreators.taskAdded("desc1"));
console.log("3", store.getState());
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
