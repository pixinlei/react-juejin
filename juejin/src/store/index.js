import { createStore, combineReducers } from 'redux'
import indexReducer from '../pages/index/index/reducer'
import homeReducer from '../pages/index/home/reducer'


const appReducer = combineReducers({
    indexReducer,
    homeReducer,
});

const store = createStore(appReducer)

export default store