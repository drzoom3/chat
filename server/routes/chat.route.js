const ChatHelper = require('../helpers/chat.helper')

module.exports = io => {
    const socketChat = io.of('/socket/chat')

    socketChat.on('connection', socket => {     
        socket.on('chats', () => {
            ChatHelper.getChats().then( chats => {
                socket.emit('chats', chats)
            }, error => {
                socketChat.emit('error', error)
            })
        })

        socket.on('create', () => {
            ChatHelper.addChat().then( chat => {
                socket.emit('create', chat)
                socket.broadcast.emit('new-chat', chat)
            }, error => {
                socketChat.emit('error', error)
            })
        })

        socket.on('join', data => {
            const chatID = data.chatID

            ChatHelper.getChat(chatID).then( chat => {
                socket.join(chatID)

                ChatHelper.getMessages(chatID).then( data => {
                    socketChat.to(chatID).emit('history', { messages: data.messages, total: data.total } )
                }, error => {
                    socketChat.emit('error', error)
                })
                ChatHelper.getUsers(chatID).then( users => {
                    const filteredUsers = users.filter( el => el._id !== data.user._id )
                    socketChat.to(chatID).emit('users', filteredUsers)
                }, error => {
                    socketChat.emit('error', error)
                })
                ChatHelper.addUser(chatID, data.user).then( user => {
                    socketChat.to(chatID).emit('enter', data.user)
                }, error => {
                    socketChat.emit('error', error)
                })
            }, error => {
                socketChat.emit('error', error)
            })
        })

        socket.on('startwrite', data => {
            const { user, chatID } = data
            socket.broadcast.to(chatID).emit('startwrite', user)
        })

        socket.on('endwrite', data => {
            const { user, chatID } = data
            socket.broadcast.to(chatID).emit('endwrite', user)
        })

        socket.on('leave', data => {
            const { user, chatID } = data

            ChatHelper.removeUser(chatID, user).then( user => {
                socketChat.to(chatID).emit('leave', user)
            }, error => {
                socketChat.emit('error', error)
            })
        })

        socket.on('message', data => { 
            const { user, text, chatID } = data

            ChatHelper.addMessage(chatID, user, text).then( message => {
                socketChat.to(chatID).emit('message', message)
            }, error => {
                socketChat.emit('error', error)
            })
        })

        /* socket.on('disconnect', data => { 
            const { user, text, chatID } = data

            ChatHelper.addMessage(chatID, user, text).then( message => {
                socketChat.to(chatID).emit('message', message)
            }, error => {
                socketChat.emit('error', error)
            })
        }) */
    })
}
