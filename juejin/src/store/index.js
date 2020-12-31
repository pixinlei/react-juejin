import { createStore } from 'redux'
import indexReducer from '../components/index/reducer'

const store = createStore(indexReducer)

export default store