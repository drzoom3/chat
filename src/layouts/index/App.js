//libs
import React from 'react'
import PropTypes from 'prop-types'

import {
    Route,
    Switch
} from 'react-router-dom'

import {
    connect
} from 'react-redux'

import '../../elements/layout/layout.styl'

import NotFoundPage from '../../pages/NotFound'
import HomePage from '../../pages/Home'
import ChatPage from '../../pages/Chat'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {        
        return <div className='body'>
            <Header/>
            <Switch>
                <Route exact path='/' component={ HomePage } />
                <Route exact path='/:chatID' component={ ChatPage } />
                <Route component={ NotFoundPage } />    
            </Switch>
            <Footer/>
        </div>
    }
}

if (process.env.NODE_ENV == 'development') {
    App.propTypes = {
    };
}

export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(App);