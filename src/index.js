import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore,compose} from "redux";

import {Provider} from "react-redux";
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch} from "react-router";
import App from "./components/App";
import reducer from "./reducer";
import {tokenMiddleware} from "./middleware";
import { routerMiddleware } from 'connected-react-router'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import configureStore, { history } from './configureStore'

const store = configureStore(/* provide initial state if any */)


// const store = createStore(reducer, compose(applyMiddleware(thunkMiddleware,tokenMiddleware,routerMiddleware(history)),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
           <>
            <Switch>
               <Route path="/" component={App}/>
            </Switch>
            </>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
