import {
    CHATS_SUCCESS,
    ADD_CHAT_SUCCESS,
    GET_MESSAGES_SUCCESS,
    ADD_MESSAGE_SUCCESS,
    GET_USERS_SUCCESS,
    ENTER_USER_SUCCESS,
    LEAVE_USER_SUCCESS,
    START_WRITE_SUCCESS,
    END_WRITE_SUCCESS
} from '../../constants/chat'

const initialState = {
    list: [],
    messages: [],
    writing: [],
    users: [],
    loading: false,
    total: 0,
    error: null
}

export default function chatState(state = initialState, action) {
    switch (action.type) {

        case CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.list
            }

        case ADD_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                list: state.list.concat(action.chat)
            }
        
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.concat ? state.messages.concat(action.messages) : action.messages,
                total: action.total
            }

        case ADD_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: state.messages.concat(action.message)
            }

        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.users
            }

        case ENTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.concat(action.user)
            }
        
        case LEAVE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter(el => el._id !== action.user._id)
            }
        
        case START_WRITE_SUCCESS:
            return {
                ...state,
                loading: false,
                writing: state.writing.concat(action.user)
            }
        
        case END_WRITE_SUCCESS:
            return {
                ...state,
                loading: false,
                writing: state.writing.filter(el => el._id !== action.user._id)
            }
        
        default:
            return state
    }
}