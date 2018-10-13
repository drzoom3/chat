import {
    combineReducers,
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import chat from '../reducers/chat'

const app = combineReducers({
    chat
})

const store = (process.env.NODE_ENV == 'development') ? createStore(app, compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(createLogger())
)) : createStore(app, compose(
    applyMiddleware(thunkMiddleware)
))

if (module.hot) {// Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').app
        store.replaceReducer(nextRootReducer)
    });
}
export default app

export { store }