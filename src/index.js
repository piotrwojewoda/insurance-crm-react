import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch} from "react-router";
import App from "./components/App";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './primeflex.css';
import configureStore, { history } from './configureStore'

const store = configureStore();

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
