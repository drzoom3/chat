import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import {
    connect
} from 'react-redux'
import {
    getChatsListSuccess,
    addChatSuccess
} from '../../actions/chat'

import './styles.styl';

export class Home extends React.Component {
    constructor(props) {
        super();

        this.socket = io(`${CONFIG.api_url}/socket/chat`, { forceNew: true });

        this.state = {
        }
        
        this.socket.on('chats', list => {
            props.getChatsListSuccess(list)
        });
        
        this.socket.on('create', chat => {
            this.props.addChatSuccess(chat)
            this.props.history.push(`/${ chat._id }`)
        });

        this.socket.on('new-chat', chat => {
            this.props.addChatSuccess(chat)
        });
        
        this.socket.emit('chats');
    }
    
    onAddChat = e => {
        this.socket.emit('create');
    }

    render() {        
        return (
            <div className='page page--home'>
                <div className='container'>
                    <div>
                        {
                            this.props.chats.map( chat => <div key={ chat._id }>
                                <Link to={`/${ chat._id }`}>{ chat._id }</Link>
                            </div>)
                        }
                    </div>
                    <button onClick={ this.onAddChat }>Создать комнату</button>
                </div>
            </div>
        )
    }
}

if (process.env.NODE_ENV == 'development') {
    Home.propTypes = {
        locale: PropTypes.string
    };
}

export default connect(
    state => ({
        chats: state.chat.list
    }),
    dispatch => ({
        getChatsListSuccess: params => dispatch(getChatsListSuccess(params)),
        addChatSuccess: params => dispatch(addChatSuccess(params))
    })
)(Home)