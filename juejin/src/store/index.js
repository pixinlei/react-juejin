import { createStore } from 'redux'
import indexReducer from '../pages/index/index/reducer'

const store = createStore(indexReducer)

export default store