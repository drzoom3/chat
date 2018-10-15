import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
    connect
} from 'react-redux'
import io from 'socket.io-client'

import {
    getMessagesSuccess,
    getUsersSuccess,
    userEnterSuccess,
    userLeaveSuccess,
    startWritingSuccess,
    endWritingSuccess,
    addMessageSuccess
} from '../../actions/chat'

import './styles.styl'

export class Chat extends React.Component {
    constructor (props) {
        super()

        const chatID = props.match.params.chatID

        if (!parseInt(chatID)) {
            this.props.history.push('/') 
        }

        const storageUser = localStorage.getItem('user')
        const user = storageUser ? JSON.parse(storageUser) : this.getNewUser()
        
        this.socket = io(`${CONFIG.api_url}/socket/chat`)

        this.state = {
            message: '',
            user,
            chatID
        }

        localStorage.setItem('user', JSON.stringify(user))

        this.socket.on('enter', user => {
            props.userEnterSuccess(user)
        })

        this.socket.on('leave', user => {
            props.userLeaveSuccess(user)
        })

        this.socket.on('startwrite', user => {
            if (!this.props.writing.some( el => el._id == user._id)) props.startWritingSuccess(user)
        });

        this.socket.on('endwrite', user => {
            props.endWritingSuccess(user)
        })
        
        this.socket.on('message', message => {
            props.addMessageSuccess(message)
        })

        this.socket.on('history', messages => {
            props.getMessagesSuccess(messages)
        })

        this.socket.on('users', users => {
            props.getUsersSuccess(users)
        })

        this.socket.on('error', error => {
            if (error.e == 'NOT_EXIST') {
                this.props.history.push('/')
            }
        })
        
        this.socket.emit('join', { user, chatID })
    }

    componentWillUnmount() {
        const { user, chatID } = this.state

        if (chatID) this.socket.emit('leave', { user, chatID })
        this.socket.close()
        window.removeEventListener('beforeunload', this.onUnload)
    }

    componentDidMount() {
       window.addEventListener('beforeunload', this.onUnload)
    }

    getNewUser() {
        const letters = 'aбвгдежзиклмнопрстуфхцчшщэюя'
        let name = ''
        for(let i=0; i < 10; i++) {
            const num = Math.round( Math.random() * letters.length - 0.5 )
            name += letters[num]
        }

        return {
            _id: new Date().getTime(),
            name
        }
    }

    onChangeMessage = e => {
        const value = e.target.value

        this.setState({
            message: value
        })
        
        if (this.tm) clearTimeout(this.tm)

        this.startWriting()
        this.tm = setTimeout( this.endWriting, 500)
    }

    onKeyDown = e => {
        if (e.keyCode === 13 && e.ctrlKey) {
            this.sendMessage()
        }
    }

    startWriting = () => {
        const { user, chatID } = this.state

        this.socket.emit('startwrite', { user, chatID })
    }

    endWriting = () => {
        const { user, chatID } = this.state

        this.socket.emit('endwrite', { user, chatID })
    }

    onSendMessage = e => {
        this.sendMessage()
    }

    sendMessage = e => {
        const {
            user,
            message,
            chatID
        } = this.state
        
        if (message) {
            this.socket.emit('message', { user, text: message, chatID })        
            this.setState({
                message: ''
            })
            this.endWriting()
        }
    }

    onUnload = e => {
        const { user, chatID } = this.state
        
        if (chatID) this.socket.emit('leave', { user, chatID })
    }

    render() {        
        return (
            this.state.chatID &&
            <div className='page page--chat'>
                <div className='container'>
                <div className='chat'>
                    <div className='chat-list'>
                        <div>
                            {
                                this.props.messages.map( message => <div key={ message._id }>
                                    <i>{ moment(message.ts).format('DD.MM.YYYY HH:mm') }</i> <b>{ message.user.name }</b>: { message.text }
                                </div>)
                            }
                            {
                                this.props.writing.map( user => <div key={ user._id }>
                                    <b>{ user.name }</b>: <span>...печатает</span>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className='chat-message'>
                        <div>
                            <textarea
                                value={ this.state.message }
                                onChange={ this.onChangeMessage }
                                onKeyDown={ this.onKeyDown }
                            ></textarea>
                        </div>
                        <div>
                            <button onClick={ this.onSendMessage }>Отправить</button> (Ctrl+Enter)
                        </div>
                        <div className='chat-users'>
                            Пользователи:&nbsp; 
                            {
                                this.props.users.map( user => <b key={ user._id }>{ user.name }</b>)
                            }
                        </div>
                    </div>
                </div>  
                </div>  
            </div>            
        )
    }
}

if (process.env.NODE_ENV == 'development') {
    Chat.propTypes = {
    }
}

export default connect(
    state => ({        
        messages: state.chat.messages,
        writing: state.chat.writing,
        users: state.chat.users,
        loading: state.chat.loading,
        error: state.chat.error
    }),
    dispatch => ({
        getMessagesSuccess: params => dispatch(getMessagesSuccess(params)),
        getUsersSuccess: params => dispatch(getUsersSuccess(params)),
        userLeaveSuccess: params => dispatch(userLeaveSuccess(params)),
        userEnterSuccess: params => dispatch(userEnterSuccess(params)),
        startWritingSuccess: params => dispatch(startWritingSuccess(params)),
        endWritingSuccess: params => dispatch(endWritingSuccess(params)),
        addMessageSuccess: params => dispatch(addMessageSuccess(params))
    })
)(Chat)