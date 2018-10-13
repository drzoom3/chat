//libs
import React from 'react'
import { render } from 'react-dom'
import cookie from 'react-cookie'
import {
    BrowserRouter,
    Route
} from 'react-router-dom'
import {
    Provider
} from 'react-redux'

import {
    store
} from '../../utils/reducers'//store

import App from './App'

render(
    <Provider store={store} >
        <BrowserRouter>
            <Route path='/' component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
