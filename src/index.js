import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore, push } from 'react-router-redux'

import MainReducer from './reducers'
import AppContainer from './app/AppContainer'
import HomeContainer from './home/HomeContainer'
import GameContainer from './game/GameContainer'
import WorksheetCreator from './creator/worksheet/WorksheetCreator'
import WorksheetEditor from './editor/worksheet/WorksheetEditor'
import WordEditor from './editor/word/WordEditor'
import AccountContainer from './account/AccountContainer'

import { updateError } from './app/duck'

import { getCurrentUser } from './services/firebase'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    MainReducer,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(browserHistory),
            thunk
        )
    )
)

const history = syncHistoryWithStore(browserHistory, store)

const isConnected = (nextState, replace) => {
    getCurrentUser()
    .then(u => {
        if (!u) {
            store.dispatch(updateError(new Error("You are not connected")))
            return store.dispatch(push("/account"))
        }

        //if (!u.emailVerified) {
        //    store.dispatch(updateError(new Error("Your email has not been verified")))
        //    return store.dispatch(push("/"))
        //}

        if (!u.role) {
            store.dispatch(updateError(new Error("You are not accredited by the administrator")))
            return store.dispatch(push("/"))
        }
    })
}

const isNotConnected = (nextState, replace) => {
    getCurrentUser()
    .then(u => u ? store.dispatch(push("/")) : null)
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={AppContainer}>
                <Route path="/" component={HomeContainer} />
                <Route path="/game/:id" component={GameContainer} />
                <Route path="/create/worksheet" component={WorksheetCreator} onEnter={isConnected} />
                <Route path="/edit/worksheet/:id" component={WorksheetEditor} onEnter={isConnected} />
                <Route path="/edit/word/:id" component={WordEditor} onEnter={isConnected} />
                <Route path="/account" component={AccountContainer} onEnter={isNotConnected} />
                <Redirect from="*" to="/" />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)
