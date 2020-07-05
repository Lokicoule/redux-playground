import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middleware/logger';
import thunk from './middleware/thunk';

export default function() {
    return configureStore({ 
        reducer,
        middleware: [logger("console"), thunk]
     });
};