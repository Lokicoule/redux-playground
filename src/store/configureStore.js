import {createStore} from 'redux';
import reducer from './tasks';


export default function configureStore() {
    return createStore(reducer);
};