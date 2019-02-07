// configureStore.js

import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducer'
import {tokenMiddleware} from "./middleware";
import thunkMiddleware from 'redux-thunk';

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware,
                tokenMiddleware
            ),
          //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ),
    )

    return store
}
