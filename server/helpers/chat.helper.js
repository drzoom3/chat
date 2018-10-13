const store = []

const getChats = () => {    
    const chats = store.filter( chat => ({ _id: chat._id, name: chat._name }))

    return Promise.resolve(chats)
}

const addChat = () => {
    const chat = {
        _id: new Date().getTime(),
        name: new Date().getTime(),
        messages: [],
        users: []
    }
    
    store.push( chat )

    return Promise.resolve(chat)
}

const getChat = chatID => {
    const promise = new Promise( (resolve, reject) => {
        
        const chat = store.find( el => el._id == chatID )

        if (chat) {
            resolve(chat)
        } else {
            reject({ e: 'NOT_EXIST', code: 404, message: 'Chat not exist more'})
        }
    })

    return promise
}

const getMessages = chatID => {
    const promise = new Promise( (resolve, reject) => {
        getChat(chatID).then( chat => {            
            resolve({messages: chat.messages.slice(0,50), total: chat.messages.length})
        }, error => {
            reject(error)
        })
    })

    return promise
}

const getUsers = chatID => {
    const promise = new Promise( (resolve, reject) => {
        getChat(chatID).then( chat => {
            const users = chat.users.filter( el => ({ _id: el._id, name: el._name }))

            resolve(users)
        }, error => {
            reject(error)
        })
    })

    return promise
}

const addUser = (chatID, user) => {
    const promise = new Promise( (resolve, reject) => {        
        getChat(chatID).then( chat => {
            if ( !chat.users.find( el => el._id == user._id) ) chat.users.push(user)

            resolve(user)
        }, error => {
            reject(error)
        })
    })

    return promise
}

const removeUser = (chatID, user) => {
    const promise = new Promise( (resolve, reject) => {        
        getChat(chatID).then( chat => {
            const users = chat.users.filter( el => el._id !== user._id)

            chat.users = users
            
            resolve(user)
        }, error => {
            reject(error)
        })
    })

    return promise
}

const addMessage = (chatID, user, text) => {
    const promise = new Promise( (resolve, reject) => {
        getChat(chatID).then( chat => {
            const ts = new Date().getTime()
            const message = {
                _id: ts,
                user,
                text,
                ts
            }

            chat.messages.push(message)

            resolve(message)
        }, error => {
            reject(error)
        })
    })

    return promise
}

module.exports = {
    getChats,
    getChat,
    addChat,
    getMessages,
    getUsers,
    addUser,
    removeUser,
    addMessage
}