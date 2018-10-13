import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './styles.styl'

export class Footer extends React.Component {
    constructor(){
        super();

        this.state = {
        };
    }

    render() {

        return (
            <footer className='footer'>
                <div className='container'>&copy; 2018</div>    
            </footer>
        )
    }
}

if (process.env.NODE_ENV == 'development') {
    Footer.propTypes = {
    };
}

export default connect(
    state => ({
    })
)(Footer)