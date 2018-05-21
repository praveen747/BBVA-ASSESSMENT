import {
    combineReducers
} from 'redux';
import eventReducer from './eventReducer';


const rootReducer = combineReducers({
    eventReducer
});

export default rootReducer;
