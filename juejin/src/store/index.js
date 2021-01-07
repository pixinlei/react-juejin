import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import indexReducer from '../pages/index/index/reducer'
import homeReducer from '../pages/index/home/reducer'
import loginReducer from  '../components/login/reducer'


const appReducer = combineReducers({
    indexReducer,
    homeReducer,
    loginReducer,
});

const store = createStore(appReducer, applyMiddleware(thunk))

export default store