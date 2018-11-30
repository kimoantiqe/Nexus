import { combineReducers } from 'redux';
import login from './LoginReducer';
import settings from './SettingsReducer'
import chatdashboard from './ChatDashReducer'

export default combineReducers({
    login,
    settings,
    chatdashboard,
});