import { combineReducers } from 'redux';
import { GeneralReducer } from './general-reducer';

export const Reducers = combineReducers({
    general: GeneralReducer,
});