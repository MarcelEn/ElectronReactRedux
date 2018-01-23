import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { forwardToMain, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux"

const exampleReducer = (state = { number: 0 }, action) => {
    switch (action.type) {
        case 'INC':
            return { ...state, number: state.number + action.payload };
        case 'DEC':
            return { ...state, number: state.number - action.payload };
    }
    return state;
};

const reducers = combineReducers({
    example: exampleReducer
});

const middleWare = store => next => action => {
    console.log('Renderer middleWare' + action);
    next(action);
}

const store = createStore(
    reducers,
    {
        number: 0
    },
    applyMiddleware(
        forwardToMain.
        middleWare
    )
);

replayActionRenderer(store);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
