import React from 'react'
import {
    Link
} from 'react-router-dom'
import {
    connect
} from 'react-redux'

import './styles.styl'

export class Header extends React.Component {
    constructor(){
        super();

        this.state = {
        };
    }

    render() {
        return (
            <header className='header'>
                <div className='container'>
                    Чат
                </div>
            </header>
        )
    }
}

export default connect(
    state => ({
    })
)(Header)