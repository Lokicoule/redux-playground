import createStore from './customStore';
import reducer from './reducer';

const store = createStore(reducer);

export default store;