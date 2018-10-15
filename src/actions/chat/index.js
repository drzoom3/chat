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
} from '../../constants/chat';

/* const socket = null;

export const startChatSocket = url => {
  return dispatch => {
  }
} */

export const getChatsListSuccess = list => ({
  type: CHATS_SUCCESS,
  list
});

export const addChatSuccess = chat => ({
  type: ADD_CHAT_SUCCESS,
  chat
});

export const getMessagesSuccess = (data, concat) => ({
  type: GET_MESSAGES_SUCCESS,
  messages: data.messages,
  total: data.total,
  concat
});

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  users
});

export const userEnterSuccess = user => ({
  type: ENTER_USER_SUCCESS,
  user
});

export const userLeaveSuccess = user => ({
  type: LEAVE_USER_SUCCESS,
  user
});

export const startWritingSuccess = user => ({
  type: START_WRITE_SUCCESS,
  user
});

export const endWritingSuccess = user => ({
  type: END_WRITE_SUCCESS,
  user
});

export const addMessageSuccess = message => ({
  type: ADD_MESSAGE_SUCCESS,
  message
});