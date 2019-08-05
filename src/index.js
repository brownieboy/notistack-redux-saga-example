/**
 * CREDIT to GitHub@natepage for this example
 */
import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import { SnackbarProvider } from 'notistack';
import notifyReducers from './redux/notify-reducers';
import exportReducers from "./redux/export-reducers";
import notifySaga from "./redux/sagas/notify-sagas";
import App from './App';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({ app: notifyReducers, export: exportReducers }), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(notifySaga);

render(
    <Provider store={store}>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root'),
);
