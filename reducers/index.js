import { combineReducers } from 'redux';
import login from './LoginReducer';
import settings from './SettingsReducer'

export default combineReducers({
    login,
    settings
});